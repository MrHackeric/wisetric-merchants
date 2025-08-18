import React, { useEffect, useRef } from "react";
import {
  Grid,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { ORANGE, NAVY } from "../../theme";

export default function Gallery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Video refs
  const filmRef = useRef(null);
  const lightingRef = useRef(null);

  // Autoplay handling with fallback
  useEffect(() => {
    const videos = [filmRef.current, lightingRef.current].filter(Boolean);

    const handlePlay = async (video) => {
      if (!video) return;
      try {
        await video.play();
      } catch {
        const playOnInteraction = () => {
          video.play().finally(() => {
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("touchstart", playOnInteraction);
          });
        };
        document.addEventListener("click", playOnInteraction, { once: true });
        document.addEventListener("touchstart", playOnInteraction, {
          once: true,
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) handlePlay(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    videos.forEach((video) => {
      observer.observe(video);
      handlePlay(video);
    });

    const handleVisibilityChange = () => {
      if (!document.hidden) videos.forEach(handlePlay);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Gallery data
  const photos = [
    {
      id: "wiring",
      title: "Electrical Wiring",
      desc: "Professional wiring and installations for homes and businesses.",
      image: "/images/wiring.jpg",
    },
    {
      id: "interior",
      title: "Interior Designing",
      desc: "Aesthetic, functional designs with precision lighting.",
      image: "/images/interior-house.jpg",
    },
    {
      id: "event",
      title: "Event Lighting",
      desc: "Dynamic, mood-setting rigs for film, stage, and events.",
      image: "/images/event-lighting.jpg",
    },
  ];

  // Motion presets
  const cardMotion = {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <Box
      id="gallery"
      sx={{
        py: { xs: 6, md: 10 },
        px: 0,
        background: `linear-gradient(135deg, ${NAVY} 0%, #0f172a 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <Box
        component={motion.div}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        sx={{
          position: "absolute",
          top: -320,
          right: -320,
          width: 640,
          height: 640,
          background: `radial-gradient(circle, ${ORANGE}15 0%, transparent 70%)`,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1600, mx: "auto" }}>
        {/* Title */}
        <Typography
          variant="h2"
          component={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            fontWeight: 900,
            mb: { xs: 4, md: 6 },
            textAlign: "center",
            color: "white",
            px: { xs: 3, sm: 5, md: 6 },
            "& span": {
              color: ORANGE,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 6,
                left: 0,
                width: "100%",
                height: 8,
                bgcolor: `${ORANGE}33`,
                zIndex: -1,
                borderRadius: 2,
              },
            },
          }}
        >
          Our <span>Work</span>
        </Typography>

        {/* ROW 1 — IMAGES */}
        <Grid container columns={12} spacing={0} sx={{ width: "100%" }}>
          {photos.map((p, idx) => (
            <Grid key={p.id} size={{ xs: 12, sm: 4 }}>
              <Box
                component={motion.div}
                {...cardMotion}
                transition={{ ...cardMotion.transition, delay: idx * 0.08 }}
                whileHover={
                  !isMobile
                    ? {
                        scale: 1.03,
                        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                      }
                    : undefined
                }
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 260, sm: 360, md: 420 },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                    transform: "scale(1.02)",
                    "&:hover": { transform: "scale(1.08)" },
                  }}
                />

                {/* Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(6,16,40,0.9) 0%, rgba(6,16,40,0.2) 50%, rgba(6,16,40,0) 70%)",
                  }}
                />

                {/* Text */}
                <Stack
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, md: 3 },
                    color: "white",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, letterSpacing: 0.5 }}
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#e2e8f0" }}
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.05 }}
                  >
                    {p.desc}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Spacer */}
        <Box sx={{ height: { xs: 32, md: 50 } }} />

        {/* ROW 2 — VIDEOS */}
        <Grid container columns={12} spacing={0} sx={{ width: "100%" }}>
          {[{ ref: filmRef, label: "Film", src: "/videos/film.mp4" },
           { ref: lightingRef, label: "Lighting", src: "/videos/lighting.mp4" }]
           .map((v, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 6 }}>
              <Box
                component={motion.div}
                {...cardMotion}
                transition={{ ...cardMotion.transition, delay: idx * 0.1 }}
                sx={{
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: { xs: 260, sm: 360, md: 420 },
                  p: { xs: 2, md: 0 },
                }}
              >
                <Box
                  component={motion.div}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    aspectRatio: "16/9",
                    width: "100%",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <video
                    ref={v.ref}
                    src={v.src}
                    poster="/images/Logo.jpg"
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                    aria-label={`${v.label} showcase`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "rgba(0,0,0,0.45)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 2,
                      px: 1.2,
                      py: 0.5,
                      color: "white",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                    }}
                  >
                    {v.label}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
