import React, { useEffect, useRef } from "react";
import { Box, Typography, Stack, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import { ORANGE, NAVY } from "../../theme";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Background images
const heroImages = [
  "/images/electricity.jpg",
  "/images/lighting.jpg",
  "/images/interior.jpg",
  "/images/scanner.jpg",
];

const Badge = ({ text, icon }) => (
  <Chip
    icon={icon}
    label={text}
    sx={{
      bgcolor: "rgba(255,255,255,0.06)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.1)",
      fontWeight: 700,
      px: 1,
      "& .MuiChip-icon": { color: ORANGE, fontSize: "1rem" },
    }}
    component={motion.div}
    whileHover={{ y: -2 }}
  />
);

export default function Hero() {
  const videoRef = useRef(null);

  // Nudge the video to keep playing (muted autoplay should be allowed)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // If autoplay is blocked, keep trying on interaction
          const onInteract = () => {
            v.play().finally(() => {
              window.removeEventListener("click", onInteract);
              window.removeEventListener("touchstart", onInteract);
            });
          };
          window.addEventListener("click", onInteract, { once: true });
          window.addEventListener("touchstart", onInteract, { once: true });
        });
      }
    };
    tryPlay();
    // Resume if it ever gets paused by browser heuristics
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Box id="home" sx={{ position: "relative", overflow: "hidden" }}>
      {/* Background Slider */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          "& .swiper": { height: "100%" },
          "& .swiper-pagination-bullet": {
            bgcolor: "white",
            opacity: 0.5,
            width: 10,
            height: 10,
            transition: "all 0.3s",
          },
          "& .swiper-pagination-bullet-active": {
            bgcolor: ORANGE,
            opacity: 1,
            width: 30,
          },
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          speed={1000}
        >
          {heroImages.map((img, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: "100vh",
                  minHeight: 600,
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(30,38,66,0.9) 0%, rgba(30,38,66,0.6) 100%)",
                  },
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Foreground Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          pt: { xs: 16, md: 0 },
          pb: 10,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            px: { xs: 3, sm: 5, md: 8, lg: 10 },
          }}
        >
          {/* Responsive two-column layout */}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 4, lg: 6 }}
            alignItems={{ xs: "flex-start", lg: "stretch" }}
          >
            {/* LEFT: Text Column */}
            <Box sx={{ flex: 1, maxWidth: { xs: "100%", lg: "58%" } }}>
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Chip
                  label="CONSULTATION | FILM & EVENT LIGHTING | RENOVATION & SUPPLY"
                  sx={{
                    bgcolor: "rgba(247,163,26,0.15)",
                    color: ORANGE,
                    border: `1px solid ${ORANGE}55`,
                    fontWeight: 700,
                    mb: 3,
                    px: 2,
                    py: 1,
                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  }}
                />
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.1,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    mb: 3,
                  }}
                >
                  Complete Electrical Solutions,{" "}
                  <Box
                    component="span"
                    sx={{
                      color: ORANGE,
                      display: "inline-block",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 5,
                        left: 0,
                        width: "100%",
                        height: 8,
                        bgcolor: `${ORANGE}33`,
                        zIndex: -1,
                        borderRadius: 2,
                      },
                    }}
                  >
                    ONE
                  </Box>{" "}
                  <Box
                    component="span"
                    sx={{
                      color: ORANGE,
                      display: "inline-block",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 5,
                        left: 0,
                        width: "100%",
                        height: 8,
                        bgcolor: `${ORANGE}33`,
                        zIndex: -1,
                        borderRadius: 2,
                      },
                    }}
                  >
                    Reliable
                  </Box>{" "}
                  Source.
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography
                  sx={{
                    color: "#e2e8f0",
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    mb: 2,
                    maxWidth: 700,
                  }}
                >
                  We specialize in electrical engineering installation, repair, renovation,
                  consultation, event lighting, and custom material fabrication, providing reliable
                  solutions tailored to clients’ needs.
                </Typography>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
                  <Button
                    href="#services"
                    variant="contained"
                    sx={{
                      bgcolor: ORANGE,
                      color: NAVY,
                      fontWeight: 900,
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      "&:hover": {
                        bgcolor: "#ffa51c",
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 20px ${ORANGE}40`,
                      },
                      transition: "all 0.3s ease",
                    }}
                    endIcon={
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <ArrowForwardIcon />
                      </motion.div>
                    }
                    component={motion.a}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Services
                  </Button>
                  <Button
                    href="#contact"
                    variant="outlined"
                    sx={{
                      borderColor: `${ORANGE}99`,
                      color: ORANGE,
                      fontWeight: 800,
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      "&:hover": {
                        borderColor: ORANGE,
                        bgcolor: `${ORANGE}10`,
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 20px ${ORANGE}20`,
                      },
                      transition: "all 0.3s ease",
                    }}
                    endIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem" }} />}
                    component={motion.a}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get a Quote
                  </Button>
                </Stack>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{
                    flexWrap: "wrap",
                    gap: 2,
                    "& .MuiChip-root": { m: "0 !important" },
                  }}
                >
                  <Badge text="Certified Electricians" icon={<VerifiedIcon />} />
                  <Badge text="24/7 Support" icon={<SupportAgentIcon />} />
                  <Badge text="On-time Delivery" icon={<CheckCircleIcon />} />
                </Stack>
              </motion.div>
            </Box>

            {/* RIGHT: Video Column */}
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", lg: "42%" },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", lg: "flex-end" },
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ width: "100%" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: { xs: 560, lg: 640 },
                    aspectRatio: "16 / 9",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(6px)",
                    // sticky so it keeps visible while you scroll within hero height
                    positionSticky: "sticky",
                    top: { xs: 20, lg: 40 },
                  }}
                  component={motion.div}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Soft gradient ring on hover */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: -2,
                      borderRadius: 3,
                      pointerEvents: "none",
                      background:
                        "conic-gradient(from 180deg at 50% 50%, transparent, transparent, rgba(247,163,26,0.35), transparent, transparent)",
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                      zIndex: 1,
                    }}
                    className="video-glow"
                  />
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      "&:hover ~ .video-glow": { opacity: 1 },
                    }}
                  >
                    <video
                      ref={videoRef}
                      src="/videos/flag.mp4"            // <-- replace with your video
                      poster="/images/bottle.jpg" // <-- optional poster
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="auto"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>

                  {/* Top-right badge over video */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      zIndex: 2,
                      bgcolor: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 2,
                      px: 1.25,
                      py: 0.5,
                      backdropFilter: "blur(6px)",
                    }}
                    component={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: `${ORANGE}22`,
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <BoltIcon sx={{ color: ORANGE, fontSize: 18 }} />
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.9rem" }}>
                        Safety-first Electricals
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
