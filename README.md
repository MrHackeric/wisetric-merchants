# Wisetric Merchants

A modern, responsive business web application for **Wisetric Merchants**, providing electrical engineering, lighting, renovation, consultation, event lighting, and material supply services.

Repository: [https://github.com/MrHackeric/wisetric-merchants](https://github.com/MrHackeric/wisetric-merchants)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Local Development](#local-development)
- [Docker & Containerization](#docker--containerization)
- [CI/CD Pipeline with Jenkins](#cicd-pipeline-with-jenkins)
- [GitOps Deployment with ArgoCD](#gitops-deployment-with-argocd)
  - [Directory Structure](#directory-structure)
  - [Prerequisites](#prerequisites)
  - [Local Cluster Deployment (k3s / minikube / kind)](#1-local-cluster-deployment)
  - [Production / Server Cluster Deployment](#2-production--server-cluster-deployment)
  - [Direct Manifest Deployment (kubectl)](#3-direct-manifest-deployment-kubectl)
- [Troubleshooting & Verification](#troubleshooting--verification)
- [Business Information](#business-information)

---

## Features

- **Responsive & Modern UI**: Built with React 19, Tailwind CSS v4, and Material UI (MUI).
- **Service Showcase**: Interactive cards detailing electrical, lighting, renovation, and supply solutions.
- **Project Portfolio & Gallery**: Visual gallery with modal preview and category filtering.
- **Inquiry & Quote Forms**: Seamless customer contact and quote acquisition flows.
- **Enterprise-Grade CI/CD**: Declarative Jenkins pipeline with linting, testing, multi-stage Docker builds, container smoke tests, and automated registry pushing.
- **Declarative GitOps with ArgoCD**: Native Kustomize base and overlays supporting both local development environments and multi-replica production servers with auto-scaling and Ingress TLS.

---

## Tech Stack

- **Frontend**: React 19, Vite 7, Tailwind CSS 4, Material UI (MUI 7)
- **Web Server**: High-performance Nginx Alpine with SPA history routing, gzip compression, asset caching, and `/healthz` endpoint
- **Containerization**: Docker & Docker Compose
- **Continuous Integration (CI)**: Jenkins Declarative Pipeline (`Jenkinsfile`)
- **Continuous Delivery & GitOps (CD)**: ArgoCD with Kubernetes Kustomize manifests (`k8s/` and `argocd/`)

---

## Local Development

### Prerequisites

- Node.js >= 20.19.0
- npm >= 10.0.0

### Run the Application

```bash
# 1. Clone the repository
git clone https://github.com/MrHackeric/wisetric-merchants.git
cd wisetric-merchants

# 2. Install dependencies
npm ci

# 3. Start development server
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173).

### Build & Lint

```bash
# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Docker & Containerization

The project includes an optimized multi-stage [Dockerfile](file:///home/hackeric/Music/wisetric-merchants/Dockerfile) and a custom [nginx.conf](file:///home/hackeric/Music/wisetric-merchants/nginx.conf).

### 1. Build Docker Image

```bash
docker build -t mrhackeric/wisetric-merchants:latest .
```

### 2. Run Container Locally

```bash
docker run -d \
  --name wisetric-merchants \
  -p 3000:80 \
  mrhackeric/wisetric-merchants:latest
```

Access the application at [http://localhost:3000](http://localhost:3000) and verify the health check at [http://localhost:3000/healthz](http://localhost:3000/healthz).

### 3. Using Docker Compose

```bash
# Start container in detached mode
docker compose up -d

# Check status and health
docker compose ps

# View logs
docker compose logs -f

# Stop container
docker compose down
```

---

## CI/CD Pipeline with Jenkins

The repository contains a declarative [Jenkinsfile](file:///home/hackeric/Music/wisetric-merchants/Jenkinsfile) automating continuous integration and delivery.

### CI/CD Workflow Architecture

```
Developer Push ──> GitHub (mrhackeric/wisetric-merchants)
                         │
                         ▼
               Jenkins Pipeline (Jenkinsfile)
               ├── 1. Initialize & Checkout
               ├── 2. Install Dependencies (npm ci)
               ├── 3. Code Linting (npm run lint)
               ├── 4. Production Build (npm run build)
               ├── 5. Build Docker Image
               ├── 6. Container Health Smoke Test
               ├── 7. Push Image to Docker Registry
               ├── 8. Update GitOps K8s Manifest Tag
               └── 9. Trigger ArgoCD Sync / Local Deploy
                         │
                         ▼
               ArgoCD (GitOps Controller)
                         │
                         ▼
               Kubernetes Cluster (Local / Server)
```

### Pipeline Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `IMAGE_REPO` | String | `mrhackeric/wisetric-merchants` | Docker repository destination |
| `CUSTOM_TAG` | String | *(empty)* | Optional custom tag (defaults to `v<build>-<shortCommit>`) |
| `PUSH_IMAGE` | Boolean | `false` | Whether to push the image to Docker Hub / Registry |
| `DEPLOY_TARGET` | Choice | `none` | Options: `none`, `local-k8s`, `argocd-sync` |

### Setting Up Jenkins

1. **Install Jenkins Plugins**:
   - *Pipeline*
   - *Git*
   - *Docker Pipeline*
   - *Credentials Binding*
   - *Timestamper*

2. **Configure Credentials in Jenkins**:
   - `docker-hub-credentials`: Username and password / access token for Docker Hub (required if `PUSH_IMAGE` is true).
   - `github-credentials`: GitHub Personal Access Token or SSH key for pushing GitOps tag updates (optional).
   - `argocd-api-token`: ArgoCD Auth Token (optional, used if `DEPLOY_TARGET` is set to `argocd-sync`).

3. **Create Jenkins Pipeline Job**:
   - Create a new item -> **Pipeline**.
   - Under **Pipeline**, select **Pipeline script from SCM**.
   - SCM: **Git**
   - Repository URL: `https://github.com/MrHackeric/wisetric-merchants.git`
   - Branch Specifier: `*/main`
   - Script Path: `Jenkinsfile`
   - Click **Save** and select **Build with Parameters**.

---

## GitOps Deployment with ArgoCD

ArgoCD provides declarative GitOps synchronization directly from this GitHub repository into your Kubernetes cluster.

### Directory Structure

```
├── Jenkinsfile                    # Jenkins CI/CD declarative pipeline
├── Dockerfile                     # Multi-stage production container build
├── nginx.conf                     # Nginx SPA & caching configuration
├── docker-compose.yml             # Local Docker Compose setup
│
├── k8s/                           # Kubernetes Manifests (Kustomize)
│   ├── base/                      # Common base resources
│   │   ├── namespace.yaml         # wisetric-merchants namespace
│   │   ├── deployment.yaml        # Deployment with probes & resources
│   │   ├── service.yaml           # ClusterIP Service
│   │   ├── ingress.yaml           # Standard Ingress definition
│   │   └── kustomization.yaml     # Base Kustomization
│   ├── overlays/
│   │   ├── local/                 # Local cluster overlay (NodePort 30080, 1 replica)
│   │   │   ├── service-patch.yaml
│   │   │   └── kustomization.yaml
│   │   └── server/                # Production server overlay (TLS Ingress, HPA, 2+ replicas)
│   │       ├── ingress-patch.yaml
│   │       ├── hpa.yaml
│   │       └── kustomization.yaml
│   └── wisetric-merchants.yaml    # Standalone all-in-one manifest
│
└── argocd/                        # ArgoCD GitOps Specifications
    ├── application.yaml           # Standard ArgoCD Application
    ├── application-local.yaml     # Application targeting local overlay
    ├── application-server.yaml    # Application targeting production server overlay
    └── appproject.yaml            # ArgoCD AppProject RBAC & boundaries
```

### Prerequisites

- A running Kubernetes cluster (e.g., local **k3s**, **minikube**, **kind**, or a cloud/server cluster like **EKS**, **GKE**, or **bare-metal**).
- `kubectl` configured with cluster access.
- ArgoCD installed on the cluster.

#### Install ArgoCD (if not already installed)

```bash
# 1. Create ArgoCD namespace
kubectl create namespace argocd

# 2. Install ArgoCD core components
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 3. Wait for ArgoCD pods to be ready
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

# 4. (Optional) Access ArgoCD Web UI locally via port-forward
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

> **Initial Admin Password**:
> ```bash
> kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
> ```
> Log in at [https://localhost:8080](https://localhost:8080) with username `admin`.

---

### 1. Local Cluster Deployment

For local clusters (k3s, minikube, kind, MicroK8s), use the local overlay. It configures a single replica and exposes a `NodePort` on port **30080**.

#### Deploy via ArgoCD

```bash
# Apply ArgoCD Application for local deployment
kubectl apply -f argocd/application-local.yaml
```

ArgoCD will automatically pull the public repository `https://github.com/MrHackeric/wisetric-merchants.git`, build the `k8s/overlays/local` Kustomization, create the `wisetric-merchants` namespace, and deploy the application.

#### Access the Application

- **Direct NodePort**: Open [http://localhost:30080](http://localhost:30080) (or `http://<NODE-IP>:30080`).
- **Or via Port Forward**:
  ```bash
  kubectl port-forward svc/wisetric-merchants -n wisetric-merchants 8080:80
  ```
  Then browse to [http://localhost:8080](http://localhost:8080).

---

### 2. Production / Server Cluster Deployment

For production servers, the server overlay provides:
- Multiple pod replicas (baseline: 2).
- Horizontal Pod Autoscaler (scales up to 10 pods based on CPU/Memory load).
- Production Ingress with SSL/TLS termination via `cert-manager` (Let's Encrypt).

#### Step 1: Customize your domain (optional)

In [k8s/overlays/server/ingress-patch.yaml](file:///home/hackeric/Music/wisetric-merchants/k8s/overlays/server/ingress-patch.yaml), update `wisetric.example.com` to your actual domain name.

#### Step 2: Deploy via ArgoCD

```bash
# (Optional) Apply project definition
kubectl apply -f argocd/appproject.yaml

# Apply server Application manifest
kubectl apply -f argocd/application-server.yaml
```

ArgoCD continuously monitors the Git repository. Any commits pushed to `main` will automatically be detected and deployed with zero downtime rolling updates.

---

### 3. Direct Manifest Deployment (kubectl)

If you wish to test or deploy directly with `kubectl` without ArgoCD:

```bash
# Local overlay (NodePort 30080)
kubectl apply -k k8s/overlays/local

# Server overlay (Production Ingress & HPA)
kubectl apply -k k8s/overlays/server

# Or standalone single-file manifest
kubectl apply -f k8s/wisetric-merchants.yaml
```

To clean up resources:
```bash
kubectl delete -k k8s/overlays/local
```

---

## Troubleshooting & Verification

### Check Deployment & Pod Status

```bash
# Check Pods
kubectl get pods -n wisetric-merchants -o wide

# Check Service
kubectl get svc -n wisetric-merchants

# Check Ingress
kubectl get ingress -n wisetric-merchants

# View Pod logs
kubectl logs -n wisetric-merchants -l app=wisetric-merchants --tail=100
```

### Health Check Endpoint

The Nginx web container includes an HTTP `/healthz` probe used by Kubernetes liveness and readiness checks:

```bash
curl -I http://localhost:30080/healthz
# HTTP/1.1 200 OK
```

### ArgoCD Application Sync Status

```bash
# Check status via ArgoCD CLI
argocd app get wisetric-merchants-local

# Force manual sync if needed
argocd app sync wisetric-merchants-local
```

---

## Business Information

**Wisetric Merchants**  
Electrical • Lighting • Renovation • Supply

> *Complete Electrical Solutions, One Reliable Source.*
