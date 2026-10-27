import { useState, useEffect, useRef } from "react";
import { Box, Typography, Stack, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import { ORANGE, NAVY } from "../../theme";
import { QUOTE_TARGET } from "../../models/siteModel";

const SERVICES_TARGET = { pathname: "/", hash: "#services" };

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
      transition: "transform 0.2s ease, background-color 0.2s ease",
      "& .MuiChip-icon": { color: ORANGE, fontSize: "1rem" },
      "&:hover": {
        transform: "translateY(-2px)",
        bgcolor: "rgba(255,255,255,0.1)",
      },
    }}
  />
);

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  // Auto-advance hero background slides with pure lightweight interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Efficient video playback: only play when in viewport, defer loading to avoid blocking page load
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let isObserved = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isObserved = true;
          v.play().catch(() => {});
        } else if (isObserved) {
          v.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      {/* Background Slideshow — CSS Hardware-Accelerated Crossfade (Zero JS Carousel Overhead) */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {heroImages.map((img, index) => (
          <Box
            key={img}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            sx={{
              backgroundImage: `url(${img})`,
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(30,38,66,0.92) 0%, rgba(30,38,66,0.65) 100%)",
              },
            }}
          />
        ))}

        {/* Lightweight Slide Indicators */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          {heroImages.map((_, i) => (
            <Box
              key={i}
              component="button"
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              sx={{
                width: i === currentSlide ? 28 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: i === currentSlide ? ORANGE : "rgba(255,255,255,0.5)",
                border: "none",
                cursor: "pointer",
                p: 0,
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: ORANGE },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Foreground Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          pt: { xs: 8, md: 0 },
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
              <Box sx={{ animation: "fadeInUp 0.6s ease-out forwards" }}>
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
                    height: "auto",
                    maxWidth: "100%",
                    "& .MuiChip-label": { whiteSpace: "normal", py: 0.5, px: 0.5 },
                  }}
                />
              </Box>

              {/* Heading */}
              <Box sx={{ animation: "fadeInUp 0.6s ease-out 0.1s forwards" }}>
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
              </Box>

              {/* Description */}
              <Box sx={{ animation: "fadeInUp 0.6s ease-out 0.2s forwards" }}>
                <Typography
                  sx={{
                    color: "#e2e8f0",
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    mb: 3,
                    maxWidth: 700,
                  }}
                >
                  We specialize in electrical engineering installation, repair, renovation,
                  consultation, event lighting, and custom material fabrication, providing reliable
                  solutions tailored to clients’ needs.
                </Typography>
              </Box>

              {/* Buttons */}
              <Box sx={{ animation: "fadeInUp 0.6s ease-out 0.3s forwards" }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
                  <Button
                    component={Link}
                    to={SERVICES_TARGET}
                    variant="contained"
                    sx={{
                      bgcolor: ORANGE,
                      color: NAVY,
                      fontWeight: 900,
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      transition: "transform 0.25s ease, background-color 0.2s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        bgcolor: "#ffa51c",
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 20px ${ORANGE}40`,
                        "& .arrow-icon": { transform: "translateX(4px)" },
                      },
                    }}
                    endIcon={
                      <ArrowForwardIcon
                        className="arrow-icon"
                        sx={{ transition: "transform 0.2s ease" }}
                      />
                    }
                  >
                    Explore Services
                  </Button>
                  <Button
                    component={Link}
                    to={QUOTE_TARGET}
                    variant="outlined"
                    sx={{
                      borderColor: `${ORANGE}99`,
                      color: ORANGE,
                      fontWeight: 800,
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        borderColor: ORANGE,
                        bgcolor: `${ORANGE}10`,
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 20px ${ORANGE}20`,
                      },
                    }}
                    endIcon={<ArrowOutwardIcon sx={{ fontSize: "1rem" }} />}
                  >
                    Get a Quote
                  </Button>
                </Stack>
              </Box>

              {/* Badges */}
              <Box sx={{ animation: "fadeInUp 0.6s ease-out 0.4s forwards" }}>
                <Stack
                  direction="row"
                  sx={{
                    flexWrap: "wrap",
                    gap: { xs: 1.5, sm: 2 },
                    "& .MuiChip-root": { m: "0 !important" },
                  }}
                >
                  <Badge text="Certified Electricians" icon={<VerifiedIcon />} />
                  <Badge text="24/7 Support" icon={<SupportAgentIcon />} />
                  <Badge text="On-time Delivery" icon={<CheckCircleIcon />} />
                </Stack>
              </Box>
            </Box>

            {/* RIGHT: Video Column */}
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", lg: "42%" },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", lg: "flex-end" },
                animation: "fadeInUp 0.6s ease-out 0.35s forwards",
              }}
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
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px ${ORANGE}30`,
                  },
                }}
              >
                <video
                  ref={videoRef}
                  src="/videos/flag.mp4"
                  poster="/images/bottle.jpg"
                  muted
                  loop
                  playsInline
                  preload="none"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Top-right badge over video */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    bgcolor: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 2,
                    px: 1.25,
                    py: 0.5,
                  }}
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
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
