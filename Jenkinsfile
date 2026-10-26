pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
    }

    parameters {
        string(
            name: 'IMAGE_REPO',
            defaultValue: 'mrhackeric/wisetric-merchants',
            description: 'Docker image repository name (e.g., <dockerhub-username>/wisetric-merchants or ghcr.io/<org>/wisetric-merchants)'
        )
        string(
            name: 'CUSTOM_TAG',
            defaultValue: '',
            description: 'Optional custom image tag (leave blank to auto-generate from build number and git commit SHA)'
        )
        booleanParam(
            name: 'PUSH_IMAGE',
            defaultValue: false,
            description: 'Push image to Docker registry (requires docker-hub-credentials in Jenkins)'
        )
        choice(
            name: 'DEPLOY_TARGET',
            choices: ['none', 'local-k8s', 'argocd-sync'],
            description: 'Post-build deployment action'
        )
    }

    environment {
        APP_NAME               = 'wisetric-merchants'
        DOCKER_REGISTRY        = 'docker.io'
        DOCKER_CREDENTIALS_ID  = 'docker-hub-credentials'
        GITHUB_CREDENTIALS_ID  = 'github-credentials'
        ARGOCD_TOKEN_ID        = 'argocd-api-token'
        ARGOCD_SERVER          = 'argocd.local' // Or your server IP/hostname
        IMAGE_TAG              = ''
    }

    stages {
        stage('Initialize & Inspect') {
            steps {
                script {
                    def shortCommit = env.GIT_COMMIT ? env.GIT_COMMIT.take(7) : 'local'
                    if (params.CUSTOM_TAG && params.CUSTOM_TAG.trim() != '') {
                        env.IMAGE_TAG = params.CUSTOM_TAG.trim()
                    } else {
                        env.IMAGE_TAG = "v${env.BUILD_NUMBER}-${shortCommit}"
                    }
                    echo "=========================================================="
                    echo "Building ${env.APP_NAME}"
                    echo "Image: ${params.IMAGE_REPO}:${env.IMAGE_TAG}"
                    echo "Build Number: ${env.BUILD_NUMBER}"
                    echo "Branch: ${env.GIT_BRANCH ?: 'unknown'}"
                    echo "=========================================================="
                }
                sh '''
                    echo "Docker Version: $(docker --version || true)"
                '''
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Installing Node.js dependencies using npm ci...'
                sh '''
                    echo "Node Version: $(node -v)"
                    echo "NPM Version: $(npm -v)"
                    npm ci
                '''
            }
        }

        stage('Lint & Validate') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Running ESLint checks...'
                sh 'npm run lint'
            }
        }

        stage('Build Application') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Building Vite production bundle...'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${params.IMAGE_REPO}:${env.IMAGE_TAG} and latest..."
                sh """
                    docker build \
                        -t ${params.IMAGE_REPO}:${env.IMAGE_TAG} \
                        -t ${params.IMAGE_REPO}:latest \
                        .
                """
            }
        }

        stage('Container Smoke Test') {
            steps {
                echo 'Running container healthcheck smoke test...'
                sh """
                    CONTAINER_ID=\$(docker run -d -p 8888:80 ${params.IMAGE_REPO}:${env.IMAGE_TAG})
                    echo "Started test container: \${CONTAINER_ID}"

                    # Wait for container startup
                    sleep 5

                    # Check HTTP status of health endpoint
                    STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8888/healthz || true)
                    echo "Healthcheck HTTP Status: \${STATUS}"

                    # Clean up test container
                    docker stop \${CONTAINER_ID} >/dev/null || true
                    docker rm \${CONTAINER_ID} >/dev/null || true

                    if [ "\${STATUS}" != "200" ]; then
                        echo "Smoke test failed! Expected HTTP 200 from /healthz, got \${STATUS}"
                        exit 1
                    fi
                    echo "Container smoke test passed!"
                """
            }
        }

        stage('Push Docker Image') {
            when {
                expression { return params.PUSH_IMAGE.toBoolean() }
            }
            steps {
                echo "Pushing Docker images to registry using credentials: ${env.DOCKER_CREDENTIALS_ID}..."
                script {
                    withCredentials([usernamePassword(
                        credentialsId: env.DOCKER_CREDENTIALS_ID,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo "\${DOCKER_PASS}" | docker login -u "\${DOCKER_USER}" --password-stdin
                            docker push ${params.IMAGE_REPO}:${env.IMAGE_TAG}
                            docker push ${params.IMAGE_REPO}:latest
                            docker logout
                        """
                    }
                }
            }
        }

        stage('Update GitOps Manifests') {
            when {
                expression { return params.PUSH_IMAGE.toBoolean() && params.DEPLOY_TARGET != 'none' }
            }
            steps {
                echo "Updating Kubernetes manifests with new tag: ${env.IMAGE_TAG}..."
                script {
                    // Update image tag in base deployment
                    sh """
                        sed -i -E 's|image: ${params.IMAGE_REPO}:.*|image: ${params.IMAGE_REPO}:${env.IMAGE_TAG}|g' k8s/base/deployment.yaml
                        echo "Updated k8s/base/deployment.yaml to use image: ${params.IMAGE_REPO}:${env.IMAGE_TAG}"
                    """
                }
            }
        }

        stage('Sync ArgoCD Application') {
            when {
                expression { return params.DEPLOY_TARGET == 'argocd-sync' }
            }
            steps {
                echo 'Triggering ArgoCD application sync...'
                script {
                    try {
                        withCredentials([string(credentialsId: env.ARGOCD_TOKEN_ID, variable: 'ARGOCD_TOKEN')]) {
                            sh """
                                echo "Triggering ArgoCD sync via API for app: ${env.APP_NAME}..."
                                curl -k -X POST \
                                    -H "Authorization: Bearer \${ARGOCD_TOKEN}" \
                                    -H "Content-Type: application/json" \
                                    "https://${env.ARGOCD_SERVER}/api/v1/applications/${env.APP_NAME}/sync" || true
                            """
                        }
                    } catch (Exception e) {
                        echo "ArgoCD sync step skipped or credentials not configured: ${e.message}"
                    }
                }
            }
        }

        stage('Deploy Local K8s') {
            when {
                expression { return params.DEPLOY_TARGET == 'local-k8s' }
            }
            steps {
                echo 'Deploying directly to local Kubernetes cluster using kubectl...'
                sh """
                    kubectl apply -k k8s/overlays/local || kubectl apply -f k8s/wisetric-merchants.yaml
                    kubectl rollout status deployment/wisetric-merchants -n wisetric-merchants --timeout=120s
                """
            }
        }
    }

    post {
        always {
            echo 'Build completed. Cleaning up workspace...'
            cleanWs notFailBuild: true
        }
        success {
            echo "Pipeline succeeded! Wisetric Merchants image ${params.IMAGE_REPO}:${env.IMAGE_TAG} ready."
        }
        failure {
            echo 'Pipeline failed! Check the console output for troubleshooting details.'
        }
    }
}
