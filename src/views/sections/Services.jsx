import { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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

const ICONS = {
  electrical: <ElectricBoltIcon sx={{ fontSize: 44, color: ORANGE }} />,
  lighting: <LightModeIcon sx={{ fontSize: 44, color: ORANGE }} />,
  renovation: <ConstructionIcon sx={{ fontSize: 44, color: ORANGE }} />,
  supply: <BoltIcon sx={{ fontSize: 44, color: ORANGE }} />,
  support: <SupportAgentIcon sx={{ fontSize: 44, color: ORANGE }} />,
  quality: <CheckCircleIcon sx={{ fontSize: 44, color: ORANGE }} />,
};

const HOVER_TEXT = {
  electrical: "Certified electricians for all installation and repair needs.",
  lighting: "Custom lighting solutions for any space or event.",
  renovation: "Complete electrical system upgrades and modernizations.",
  supply: "Quality materials from trusted suppliers worldwide.",
  support: "24/7 emergency response team available.",
  quality: "Rigorous testing and quality assurance on all work.",
};

const SERVICE_IMAGES = [
  "/images/consultation.jpg",
  "/images/lighting.jpg",
  "/images/interior.jpg",
  "/images/electricity.jpg",
  "/images/electrician.jpg",
  "/images/testing.jpg",
];

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box
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
        {SERVICES.map((service, index) => {
          const isOpen = isMobile && openIndex === index;

          return (
            <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                onClick={() => isMobile && handleToggle(index)}
                sx={{
                  width: "100%",
                  height: 400,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  cursor: "pointer",
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                  "&:hover": {
                    transform: isMobile ? "none" : "translateY(-6px)",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.5), 0 0 0 1px rgba(247,163,26,0.3)",
                    "& .service-img": {
                      transform: isMobile ? "none" : "scale(1.06)",
                      filter: isMobile ? "brightness(0.8)" : "brightness(0.6)",
                    },
                    "& .service-extra": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                {/* Background Image */}
                <Box
                  className="service-img"
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
                    transition: "transform 0.5s ease, filter 0.5s ease",
                    willChange: "transform",
                  }}
                />

                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(to top, ${NAVY}f0 0%, rgba(30,38,66,0.7) 45%, transparent 75%)`,
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
                      width: 64,
                      height: 64,
                      bgcolor: "rgba(247,163,26,0.15)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `2px solid ${ORANGE}50`,
                      mb: 2.5,
                      boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
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
                      mb: 1.5,
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* Hover / Extra Info */}
                  <Box
                    className="service-extra"
                    sx={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(12px)",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                      maxHeight: isOpen || !isMobile ? 50 : 0,
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: ORANGE,
                        fontWeight: 600,
                        mt: 0.5,
                        fontStyle: "italic",
                      }}
                    >
                      {HOVER_TEXT[service.icon]}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Services;
