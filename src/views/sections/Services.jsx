import React, { useState } from "react"; // ✅ add useState
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";

// Icons
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LightModeIcon from "@mui/icons-material/LightMode";
import ConstructionIcon from "@mui/icons-material/Construction";
import BoltIcon from "@mui/icons-material/Bolt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { SERVICES } from "../../models/siteModel";
import { ORANGE, NAVY } from "../../theme";

// ✅ Icons dictionary
const ICONS = {
  electrical: <ElectricBoltIcon sx={{ fontSize: 50, color: ORANGE }} />,
  lighting: <LightModeIcon sx={{ fontSize: 50, color: ORANGE }} />,
  renovation: <ConstructionIcon sx={{ fontSize: 50, color: ORANGE }} />,
  supply: <BoltIcon sx={{ fontSize: 50, color: ORANGE }} />,
  support: <SupportAgentIcon sx={{ fontSize: 50, color: ORANGE }} />,
  quality: <CheckCircleIcon sx={{ fontSize: 50, color: ORANGE }} />,
};

// ✅ Extra hover text
const HOVER_TEXT = {
  electrical: "Certified electricians for all installation and repair needs.",
  lighting: "Custom lighting solutions for any space or event.",
  renovation: "Complete electrical system upgrades and modernizations.",
  supply: "Quality materials from trusted suppliers worldwide.",
  support: "24/7 emergency response team available.",
  quality: "Rigorous testing and quality assurance on all work.",
};

// ✅ Service images
const SERVICE_IMAGES = [
  "/images/consultation.jpg",
  "/images/lighting.jpg",
  "/images/interior.jpg",
  "/images/electricity.jpg",
  "/images/electrician.jpg",
  "/images/testing.jpg",
];

// ✅ Motion wrapper (new API)
const MotionBox = motion.create(Box);

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <Box
      component="section"
      id="services"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: 10,
        px: isMobile ? 2 : 8,
        background: `linear-gradient(135deg, ${NAVY} 0%, #0f172a 100%)`,
      }}
    >
      {/* Section Heading */}
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            color: "white",
            mb: 2,
            fontSize: isMobile ? "2.2rem" : "3rem",
          }}
        >
          Our <Box component="span" sx={{ color: ORANGE }}>Services</Box>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: 700,
            margin: "0 auto",
            color: "#cbd5e1",
            fontSize: isMobile ? "1rem" : "1.2rem",
          }}
        >
          Providing safe, reliable, and innovative electrical solutions
        </Typography>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={3}>
        {SERVICES.map((service, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <MotionBox
              onClick={() => isMobile && handleToggle(index)} // 👈 toggle on tap for mobile
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={!isMobile ? { scale: 1.03 } : {}}
              sx={{
                width: "100%",
                height: 400,
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
            >
              {/* Service Image */}
              <MotionBox
                className="service-image"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${SERVICE_IMAGES[index]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.8)",
                }}
                whileHover={!isMobile ? { scale: 1.05, filter: "brightness(0.6)" } : {}}
                transition={{ duration: 0.5 }}
              />

              {/* Gradient Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(to top, ${NAVY}ee, transparent 60%)`,
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  p: 4,
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: `${ORANGE}20`,
                    backdropFilter: "blur(5px)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${ORANGE}40`,
                    mb: 3,
                  }}
                >
                  {ICONS[service.icon]}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: "white",
                    mb: 1,
                  }}
                >
                  {service.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#e2e8f0",
                    mb: 2,
                  }}
                >
                  {service.description}
                </Typography>

                {/* Hover / Extra Info */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isMobile
                      ? openIndex === index
                        ? 1
                        : 0
                      : 0,
                    y: isMobile
                      ? openIndex === index
                        ? 0
                        : 20
                      : 20,
                  }}
                  whileHover={!isMobile ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: ORANGE,
                      fontWeight: 600,
                      mt: 2,
                      fontStyle: "italic",
                    }}
                  >
                    {HOVER_TEXT[service.icon]}
                  </Typography>
                </MotionBox>
              </Box>
            </MotionBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
