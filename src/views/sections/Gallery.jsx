import { useEffect, useRef } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { ORANGE, NAVY } from "../../theme";

export default function Gallery() {
  const filmRef = useRef(null);
  const lightingRef = useRef(null);

  // Play each video only while it's on screen (saves battery + data), pause it otherwise
  useEffect(() => {
    const videos = [filmRef.current, lightingRef.current].filter(Boolean);
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play().catch(() => {});
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
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

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: 0,
        background: `linear-gradient(135deg, ${NAVY} 0%, #0f172a 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Static Ambient Glow (Zero continuous GPU redraw) */}
      <Box
        sx={{
          position: "absolute",
          top: -160,
          right: -160,
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${ORANGE}14 0%, transparent 70%)`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1600, mx: "auto" }}>
        {/* Title */}
        <Typography
          variant="h2"
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
          {photos.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 4 }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: { xs: 260, sm: 360, md: 420 },
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover img": {
                    transform: "scale(1.08)",
                  },
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
                    transition: "transform 0.5s ease",
                    transform: "scale(1.01)",
                    willChange: "transform",
                  }}
                />

                {/* Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(6,16,40,0.92) 0%, rgba(6,16,40,0.2) 50%, rgba(6,16,40,0) 70%)",
                  }}
                />

                {/* Text */}
                <Stack
                  spacing={0.5}
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
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#e2e8f0" }}
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
        <Grid container columns={12} spacing={{ xs: 2, md: 3 }} sx={{ width: "100%", px: { xs: 2, md: 4 } }}>
          {[
            { ref: filmRef, label: "Film", src: "/videos/film.mp4", poster: "/images/event-lighting.jpg" },
            { ref: lightingRef, label: "Lighting", src: "/videos/lighting.mp4", poster: "/images/lighting.jpg" },
          ].map((v) => (
            <Grid key={v.label} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  aspectRatio: "16/9",
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 24px 50px rgba(0,0,0,0.45), 0 0 0 1px ${ORANGE}30`,
                  },
                }}
              >
                <video
                  ref={v.ref}
                  src={v.src}
                  poster={v.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
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
                    bgcolor: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 2,
                    px: 1.2,
                    py: 0.5,
                    color: "white",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                  }}
                >
                  {v.label}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
