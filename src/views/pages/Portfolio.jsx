import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import GridViewIcon from "@mui/icons-material/GridView";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import { Link } from "react-router-dom";
import { ORANGE, NAVY } from "../../theme";
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_VIDEOS,
  BRAND,
} from "../../models/siteModel";

// ─── Constants ────────────────────────────────────────────────────────────────
const DARK_BG = "#060d1e";
const CARD_BG = "rgba(10,20,50,0.9)";

// ─── Floating particle background ────────────────────────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 3.5,
  delay: Math.random() * 6,
  duration: 7 + Math.random() * 9,
}));

function ParticleField() {
  return (
    <Box
      aria-hidden
      sx={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}
    >
      {PARTICLES.map((p) => (
        <Box
          key={p.id}
          component={motion.div}
          animate={{ y: [0, -40, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          sx={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            bgcolor: ORANGE,
            filter: "blur(1px)",
          }}
        />
      ))}
    </Box>
  );
}

// ─── Category filter pill ─────────────────────────────────────────────────────
function FilterPill({ label, active, onClick, count }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }}>
      <Chip
        label={
          <Stack direction="row" alignItems="center" spacing={0.6}>
            <span>{label}</span>
            {count !== undefined && (
              <Box
                component="span"
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  bgcolor: active ? `${NAVY}55` : `${ORANGE}22`,
                  color: active ? NAVY : ORANGE,
                  borderRadius: "6px",
                  px: 0.7,
                  py: 0.1,
                  lineHeight: 1.6,
                }}
              >
                {count}
              </Box>
            )}
          </Stack>
        }
        onClick={onClick}
        sx={{
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "0.82rem",
          px: 1.5,
          height: 36,
          bgcolor: active ? ORANGE : "rgba(255,255,255,0.05)",
          color: active ? NAVY : "rgba(255,255,255,0.8)",
          border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: active ? `0 4px 20px ${ORANGE}50` : "none",
          transition: "all 0.25s ease",
          "& .MuiChip-label": { px: 0 },
          "&:hover": {
            bgcolor: active ? "#ffb03a" : "rgba(255,255,255,0.09)",
          },
        }}
      />
    </motion.div>
  );
}

// ─── Image count badge ────────────────────────────────────────────────────────
function ImageCountBadge({ count }) {
  if (count <= 1) return null;
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.4}
      sx={{
        position: "absolute",
        top: 10,
        left: 10,
        bgcolor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        borderRadius: "8px",
        px: 1,
        py: 0.4,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <PhotoLibraryIcon sx={{ color: "white", fontSize: 12 }} />
      <Typography sx={{ color: "white", fontSize: "0.65rem", fontWeight: 700, lineHeight: 1 }}>
        {count}
      </Typography>
    </Stack>
  );
}

// ─── Image dot strip (thumbnail dots) ────────────────────────────────────────
function ImageDots({ total, current }) {
  if (total <= 1) return null;
  return (
    <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ mt: 0.5 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: i === current ? 16 : 6,
            height: 6,
            borderRadius: "3px",
            bgcolor: i === current ? ORANGE : "rgba(255,255,255,0.3)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </Stack>
  );
}

// ─── Gallery card ─────────────────────────────────────────────────────────────
function GalleryCard({ item, index, layout, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const images = item.images || [item.image];
  const intervalRef = useRef(null);

  useEffect(() => {
    if (hovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setImgIndex((i) => (i + 1) % images.length);
      }, 900);
    } else {
      clearInterval(intervalRef.current);
      setImgIndex(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, images.length]);

  const cardHeight =
    layout === "masonry"
      ? index % 3 === 0
        ? { xs: 260, sm: 340, md: 400 }
        : { xs: 230, sm: 290, md: 330 }
      : { xs: 230, sm: 290, md: 330 };

  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.91 }}
      transition={{ duration: 0.42, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -7 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        height: cardHeight,
        cursor: "pointer",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.65), 0 0 0 1px ${ORANGE}30`
          : "0 6px 24px rgba(0,0,0,0.35)",
        transition: "box-shadow 0.3s ease",
        border: "1px solid rgba(255,255,255,0.07)",
        bgcolor: CARD_BG,
      }}
    >
      {/* Image */}
      <AnimatePresence mode="crossfade">
        <Box
          key={images[imgIndex]}
          component={motion.img}
          src={images[imgIndex]}
          alt={item.title}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: hovered ? 1.07 : 1.01 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.6, ease: "easeOut" } }}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </AnimatePresence>

      {/* Base gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(4,8,24,0.96) 0%, rgba(4,8,24,0.4) 40%, rgba(4,8,24,0) 68%)",
          zIndex: 1,
        }}
      />

      {/* Hover overlay */}
      <Box
        component={motion.div}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        sx={{ position: "absolute", inset: 0, background: "rgba(4,8,24,0.38)", zIndex: 1 }}
      />

      {/* Image count badge */}
      <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 3 }}>
        <ImageCountBadge count={images.length} />
      </Box>

      {/* Category badge */}
      <Box
        component={motion.div}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
        transition={{ duration: 0.25 }}
        sx={{ position: "absolute", top: 10, right: 10, zIndex: 3 }}
      >
        <Chip
          label={item.category}
          size="small"
          sx={{
            bgcolor: `${ORANGE}dd`,
            color: NAVY,
            fontWeight: 800,
            fontSize: "0.68rem",
            height: 22,
            letterSpacing: 0.4,
          }}
        />
      </Box>

      {/* Zoom icon */}
      <Box
        component={motion.div}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.55 }}
        transition={{ duration: 0.25 }}
        sx={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "rgba(255,255,255,0.11)",
          backdropFilter: "blur(8px)",
          borderRadius: "50%",
          width: 54,
          height: 54,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid rgba(255,255,255,0.22)`,
          zIndex: 3,
        }}
      >
        <ZoomInIcon sx={{ color: "white", fontSize: 26 }} />
      </Box>

      {/* Bottom text */}
      <Stack
        spacing={0.6}
        sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: { xs: 2, md: 2.5 }, zIndex: 3 }}
      >
        {/* Image dots indicator */}
        <ImageDots total={images.length} current={imgIndex} />

        <Typography
          sx={{
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          {item.title}
        </Typography>

        <Box
          component={motion.div}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
        >
          <Typography sx={{ color: "#94a3b8", fontSize: "0.78rem", lineHeight: 1.4 }}>
            {item.description}
          </Typography>

          {/* Meta row */}
          <Stack direction="row" spacing={2} sx={{ mt: 1.2 }}>
            {item.client && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <BusinessIcon sx={{ color: ORANGE, fontSize: 12 }} />
                <Typography sx={{ color: ORANGE, fontSize: "0.7rem", fontWeight: 700 }}>
                  {item.client}
                </Typography>
              </Stack>
            )}
            {item.year && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <CalendarTodayIcon sx={{ color: "#64748b", fontSize: 11 }} />
                <Typography sx={{ color: "#64748b", fontSize: "0.7rem", fontWeight: 600 }}>
                  {item.year}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

// ─── Featured spotlight card ──────────────────────────────────────────────────
function FeaturedCard({ item, onOpen }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = item.images || [item.image];

  const go = (dir) =>
    setImgIndex((i) => (i + dir + images.length) % images.length);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      sx={{
        mx: { xs: 2, sm: 4, md: 8 },
        mb: { xs: 4, md: 6 },
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${ORANGE}30`,
        boxShadow: `0 0 0 1px ${ORANGE}18, 0 32px 80px rgba(0,0,0,0.6)`,
        height: { xs: 320, sm: 420, md: 500 },
        cursor: "pointer",
      }}
      onClick={() => onOpen(item)}
    >
      {/* Image */}
      <AnimatePresence mode="crossfade">
        <Box
          key={images[imgIndex]}
          component={motion.img}
          src={images[imgIndex]}
          alt={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </AnimatePresence>

      {/* Gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(4,8,24,0.9) 0%, rgba(4,8,24,0.4) 55%, rgba(4,8,24,0.1) 100%)",
          zIndex: 1,
        }}
      />

      {/* Featured label */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.8}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          bgcolor: `${ORANGE}ee`,
          color: NAVY,
          borderRadius: "8px",
          px: 1.5,
          py: 0.5,
          fontWeight: 800,
          fontSize: "0.72rem",
          letterSpacing: 1,
          zIndex: 3,
        }}
      >
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: NAVY }}
        />
        <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: 1, color: NAVY }}>
          FEATURED PROJECT
        </Typography>
      </Stack>

      {/* Image nav arrows */}
      {images.length > 1 && (
        <>
          {[
            { dir: -1, side: "left", icon: <ArrowBackIosNewIcon sx={{ fontSize: 16 }} /> },
            { dir: 1, side: "right", icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} /> },
          ].map(({ dir, side, icon }) => (
            <IconButton
              key={side}
              onClick={(e) => { e.stopPropagation(); go(dir); }}
              size="small"
              sx={{
                position: "absolute",
                top: "50%",
                [side]: 14,
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                zIndex: 4,
                "&:hover": { bgcolor: `${ORANGE}cc`, color: NAVY },
              }}
            >
              {icon}
            </IconButton>
          ))}
        </>
      )}

      {/* Content */}
      <Box sx={{ position: "absolute", bottom: 0, left: 0, p: { xs: 3, md: 5 }, zIndex: 3, maxWidth: { md: "62%" } }}>
        <Chip
          label={item.category}
          size="small"
          sx={{ bgcolor: `${ORANGE}22`, color: ORANGE, border: `1px solid ${ORANGE}55`, fontWeight: 700, mb: 1.5 }}
        />
        <Typography
          sx={{
            fontWeight: 900,
            color: "white",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.6rem" },
            lineHeight: 1.1,
            mb: 1.5,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {item.title}
        </Typography>
        <Typography sx={{ color: "#94a3b8", fontSize: { xs: "0.85rem", md: "1rem" }, lineHeight: 1.6, mb: 2 }}>
          {item.description}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {item.client && (
            <Stack direction="row" alignItems="center" spacing={0.6}>
              <BusinessIcon sx={{ color: ORANGE, fontSize: 14 }} />
              <Typography sx={{ color: ORANGE, fontSize: "0.8rem", fontWeight: 700 }}>{item.client}</Typography>
            </Stack>
          )}
          {item.year && (
            <Typography sx={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 600 }}>
              {item.year}
            </Typography>
          )}
        </Stack>
        {/* Image dots */}
        <Box sx={{ mt: 2 }}>
          <ImageDots total={images.length} current={imgIndex} />
        </Box>
      </Box>

      {/* Zoom cue */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          bgcolor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px",
          px: 1.5,
          py: 0.8,
          zIndex: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <ZoomInIcon sx={{ color: "white", fontSize: 16 }} />
          <Typography sx={{ color: "white", fontSize: "0.72rem", fontWeight: 700 }}>View Gallery</Typography>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── Video player card ────────────────────────────────────────────────────────
function VideoCard({ video, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        border: `1px solid rgba(255,255,255,0.08)`,
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px ${ORANGE}28`
          : "0 10px 36px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.35s ease",
        bgcolor: CARD_BG,
      }}
    >
      {/* Video element */}
      <Box
        component="video"
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        onClick={togglePlay}
        sx={{
          display: "block",
          width: "100%",
          aspectRatio: "16/9",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      {/* Play/pause overlay */}
      <Box
        component={motion.div}
        animate={{ opacity: !playing || hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        onClick={togglePlay}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: playing
            ? "transparent"
            : "linear-gradient(to top, rgba(4,8,24,0.75) 0%, rgba(4,8,24,0.1) 100%)",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        <Box
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          animate={{ opacity: !playing || hovered ? 1 : 0, scale: !playing || hovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: playing ? "rgba(0,0,0,0.5)" : ORANGE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: playing ? "2px solid rgba(255,255,255,0.25)" : "none",
            boxShadow: playing ? "none" : `0 8px 32px ${ORANGE}66`,
          }}
        >
          {playing ? (
            <PauseIcon sx={{ color: "white", fontSize: 30 }} />
          ) : (
            <PlayArrowIcon sx={{ color: NAVY, fontSize: 32, ml: 0.4 }} />
          )}
        </Box>
      </Box>

      {/* Top-right: mute + duration */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ position: "absolute", top: 14, right: 14, zIndex: 4 }}
      >
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            borderRadius: "8px",
            px: 1,
            py: 0.4,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "0.68rem", fontWeight: 700 }}>
            {video.duration}
          </Typography>
        </Box>
        <IconButton
          onClick={toggleMute}
          size="small"
          sx={{
            bgcolor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            width: 30,
            height: 30,
            "&:hover": { bgcolor: `${ORANGE}44`, color: ORANGE },
          }}
        >
          {muted ? <VolumeOffIcon sx={{ fontSize: 15 }} /> : <VolumeUpIcon sx={{ fontSize: 15 }} />}
        </IconButton>
      </Stack>

      {/* Caption */}
      <Box
        sx={{
          p: { xs: 2.5, md: 3 },
          background: `linear-gradient(135deg, ${DARK_BG}f8, #0f172af8)`,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
          <Box>
            <Typography
              sx={{ fontWeight: 800, color: "white", fontSize: { xs: "1rem", md: "1.15rem" }, mb: 0.5 }}
            >
              {video.title}
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.5 }}>
              {video.subtitle}
            </Typography>
          </Box>
          <Stack direction="row" flexWrap="wrap" gap={0.7} justifyContent="flex-end">
            {video.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: `${ORANGE}14`,
                  color: ORANGE,
                  border: `1px solid ${ORANGE}44`,
                  fontWeight: 700,
                  fontSize: "0.66rem",
                  height: 20,
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const item = items[currentIndex];
  const images = item?.images || (item?.image ? [item.image] : []);
  const [imgIdx, setImgIdx] = useState(0);

  // Reset inner image index when outer item changes
  useEffect(() => { setImgIdx(0); }, [currentIndex]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") {
        if (imgIdx > 0) setImgIdx((i) => i - 1);
        else onPrev();
      }
      if (e.key === "ArrowRight") {
        if (imgIdx < images.length - 1) setImgIdx((i) => i + 1);
        else onNext();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onClose, imgIdx, images.length]);

  if (!item) return null;

  return (
    <Modal
      open
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300, sx: { bgcolor: "rgba(0,0,0,0.95)" } } }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1500 }}
    >
      <Fade in>
        <Box
          sx={{
            position: "relative",
            outline: "none",
            width: { xs: "96vw", sm: "90vw", md: "80vw" },
            maxWidth: 1150,
          }}
        >
          {/* Counter */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", fontWeight: 600 }}>
              Project {currentIndex + 1} of {items.length}
              {images.length > 1 && ` · Photo ${imgIdx + 1} of ${images.length}`}
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Main image container */}
          <AnimatePresence mode="wait">
            <Box
              key={`${item.id}-${imgIdx}`}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.28 }}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                boxShadow: `0 40px 90px rgba(0,0,0,0.75), 0 0 0 1px ${ORANGE}20`,
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <Box
                component="img"
                src={images[imgIdx]}
                alt={`${item.title} — photo ${imgIdx + 1}`}
                sx={{
                  width: "100%",
                  maxHeight: "72vh",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Caption */}
              <Box
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  background: `linear-gradient(135deg, ${DARK_BG}f5, #0d1a38f5)`,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1.5}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "white", mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                    <Stack direction="row" spacing={2.5} sx={{ mt: 1.5 }}>
                      {item.client && (
                        <Stack direction="row" alignItems="center" spacing={0.6}>
                          <BusinessIcon sx={{ color: ORANGE, fontSize: 14 }} />
                          <Typography sx={{ color: ORANGE, fontSize: "0.78rem", fontWeight: 700 }}>
                            {item.client}
                          </Typography>
                        </Stack>
                      )}
                      {item.year && (
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <CalendarTodayIcon sx={{ color: "#64748b", fontSize: 13 }} />
                          <Typography sx={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600 }}>
                            {item.year}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Box>
                  <Chip
                    label={item.category}
                    sx={{ bgcolor: `${ORANGE}22`, color: ORANGE, border: `1px solid ${ORANGE}55`, fontWeight: 700 }}
                  />
                </Stack>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: "auto" }}>
                    {images.map((src, i) => (
                      <Box
                        key={i}
                        component={motion.div}
                        whileHover={{ scale: 1.06 }}
                        onClick={() => setImgIdx(i)}
                        sx={{
                          flexShrink: 0,
                          width: 64,
                          height: 44,
                          borderRadius: "8px",
                          overflow: "hidden",
                          cursor: "pointer",
                          border: i === imgIdx ? `2px solid ${ORANGE}` : "2px solid rgba(255,255,255,0.1)",
                          opacity: i === imgIdx ? 1 : 0.55,
                          transition: "all 0.2s ease",
                          "&:hover": { opacity: 0.85 },
                        }}
                      >
                        <Box
                          component="img"
                          src={src}
                          alt={`thumb ${i + 1}`}
                          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            </Box>
          </AnimatePresence>

          {/* Prev / Next project arrows */}
          {[
            { icon: <ArrowBackIosNewIcon />, action: onPrev, side: "left", disabled: currentIndex === 0 },
            { icon: <ArrowForwardIosIcon />, action: onNext, side: "right", disabled: currentIndex === items.length - 1 },
          ].map(({ icon, action, side, disabled }) => (
            <IconButton
              key={side}
              onClick={action}
              disabled={disabled}
              sx={{
                position: "absolute",
                top: "48%",
                [side]: { xs: -16, sm: -24 },
                transform: "translateY(-50%)",
                bgcolor: disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: disabled ? "rgba(255,255,255,0.15)" : "white",
                backdropFilter: "blur(8px)",
                "&:hover": { bgcolor: `${ORANGE}33`, color: ORANGE },
                transition: "all 0.2s ease",
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
      </Fade>
    </Modal>
  );
}

// ─── Main Portfolio page ──────────────────────────────────────────────────────
export default function Portfolio() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeCategory, setActiveCategory] = useState("All");
  const [layout, setLayout] = useState("grid");
  const [lightboxItem, setLightboxItem] = useState(null);

  const allItems = PORTFOLIO_ITEMS;
  const featuredItem = allItems.find((it) => it.featured) || allItems[0];
  const gridItems = allItems.filter((it) => !it.featured || it.id !== featuredItem.id);

  const filtered =
    activeCategory === "All"
      ? gridItems
      : gridItems.filter((item) => item.category === activeCategory);

  const getCategoryCount = (cat) =>
    cat === "All"
      ? gridItems.length
      : gridItems.filter((it) => it.category === cat).length;

  // Lightbox on the filtered set
  const filteredWithFeatured =
    activeCategory === "All"
      ? allItems
      : allItems.filter((it) => it.category === activeCategory);

  const lightboxIndex = lightboxItem
    ? filteredWithFeatured.findIndex((it) => it.id === lightboxItem.id)
    : null;

  const openLightbox = useCallback((item) => setLightboxItem(item), []);
  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  const prevItem = useCallback(() => {
    setLightboxItem((cur) => {
      const idx = filteredWithFeatured.findIndex((it) => it.id === cur.id);
      return filteredWithFeatured[Math.max(0, idx - 1)];
    });
  }, [filteredWithFeatured]);

  const nextItem = useCallback(() => {
    setLightboxItem((cur) => {
      const idx = filteredWithFeatured.findIndex((it) => it.id === cur.id);
      return filteredWithFeatured[Math.min(filteredWithFeatured.length - 1, idx + 1)];
    });
  }, [filteredWithFeatured]);

  const gridCols =
    layout === "masonry"
      ? { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }
      : { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${DARK_BG} 0%, #0c1530 40%, #0f1a3a 100%)`,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ── Hero header ── */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 8, md: 13 },
          pb: { xs: 5, md: 7 },
          px: { xs: 3, sm: 5, md: 10 },
          overflow: "hidden",
        }}
      >
        <ParticleField />

        {/* Glow blob */}
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
          sx={{
            position: "absolute",
            top: -140,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 440,
            background: `radial-gradient(ellipse, ${ORANGE}1e 0%, transparent 72%)`,
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(36px)",
          }}
        />

        {/* Back to home */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ position: "relative", zIndex: 1, mb: 4 }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "#64748b",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.88rem",
              transition: "color 0.2s ease",
              "&:hover": { color: ORANGE },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 17 }} />
            Back to Home
          </Box>
        </Box>

        {/* Title block */}
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <Chip
              label={`${BRAND.name} — OUR WORK`}
              sx={{
                bgcolor: `${ORANGE}16`,
                color: ORANGE,
                border: `1px solid ${ORANGE}40`,
                fontWeight: 700,
                mb: 3,
                px: 2,
                letterSpacing: 1.2,
                fontSize: "0.7rem",
                height: 30,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.8rem", sm: "3.8rem", md: "5rem" },
                lineHeight: 1.02,
                mb: 3,
                letterSpacing: -2,
                color: "white",
              }}
            >
              Project{" "}
              <Box
                component="span"
                sx={{
                  color: ORANGE,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 6,
                    left: 0,
                    width: "100%",
                    height: 12,
                    bgcolor: `${ORANGE}22`,
                    zIndex: -1,
                    borderRadius: 3,
                  },
                }}
              >
                Portfolio
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            <Typography
              sx={{
                color: "#64748b",
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 520,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              A curated showcase of electrical, lighting, renovation, and commissioning work
              delivered across Kenya.
            </Typography>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 3, md: 7 }}
              justifyContent="center"
              divider={
                <Box sx={{ width: 1, bgcolor: "rgba(255,255,255,0.06)", alignSelf: "stretch", my: 1 }} />
              }
              sx={{ mt: 6 }}
            >
              {[
                { value: "200+", label: "Projects Delivered" },
                { value: "50+", label: "Happy Clients" },
                { value: "8+", label: "Years Active" },
              ].map((stat) => (
                <Box key={stat.label} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.8rem", md: "2.4rem" },
                      fontWeight: 900,
                      color: ORANGE,
                      lineHeight: 1,
                      letterSpacing: -1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: "#475569", fontSize: "0.75rem", fontWeight: 700, mt: 0.5, letterSpacing: 0.5 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </motion.div>
        </Box>
      </Box>

      {/* ── Thin divider ── */}
      <Box
        sx={{
          mx: { xs: 2, sm: 4, md: 8 },
          mb: { xs: 4, md: 5 },
          height: 1,
          background: `linear-gradient(90deg, transparent, ${ORANGE}40, transparent)`,
        }}
      />

      {/* ── Featured project spotlight ── */}
      {activeCategory === "All" && (
        <FeaturedCard item={featuredItem} onOpen={openLightbox} />
      )}

      {/* ── Filter & layout controls ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        sx={{
          px: { xs: 3, sm: 5, md: 10 },
          mb: { xs: 3, md: 4 },
          position: "sticky",
          top: 64,
          zIndex: 100,
          py: 2,
          background: "rgba(6,13,30,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          {/* Category pills with count badges */}
          <Stack direction="row" flexWrap="wrap" gap={0.8}>
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                count={getCategoryCount(cat)}
              />
            ))}
          </Stack>

          {/* Layout toggle + count */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography sx={{ color: "#475569", fontSize: "0.82rem", fontWeight: 700 }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {[
                { mode: "grid", icon: <GridViewIcon sx={{ fontSize: 18 }} /> },
                { mode: "masonry", icon: <AutoAwesomeMosaicIcon sx={{ fontSize: 18 }} /> },
              ].map(({ mode, icon }) => (
                <IconButton
                  key={mode}
                  onClick={() => setLayout(mode)}
                  size="small"
                  sx={{
                    color: layout === mode ? ORANGE : "#475569",
                    bgcolor: layout === mode ? `${ORANGE}16` : "transparent",
                    border: layout === mode ? `1px solid ${ORANGE}40` : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "8px",
                    width: 32,
                    height: 32,
                    transition: "all 0.2s ease",
                    "&:hover": { color: ORANGE, bgcolor: `${ORANGE}12` },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* ── Gallery grid ── */}
      <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, pb: { xs: 8, md: 10 } }}>
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <Box
              key="empty"
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{ textAlign: "center", py: 16 }}
            >
              <Typography sx={{ color: "#334155", fontSize: "1.05rem" }}>
                No projects in this category yet.
              </Typography>
            </Box>
          ) : (
            <Box
              key={activeCategory + layout}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              sx={{
                display: "grid",
                gridTemplateColumns: gridCols,
                gap: { xs: 2, md: 2.5 },
                alignItems: layout === "masonry" ? "start" : "stretch",
              }}
            >
              {filtered.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  layout={layout}
                  onClick={() => openLightbox(item)}
                />
              ))}
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {/* ── Video Reel section ── */}
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 8 },
          pb: { xs: 10, md: 14 },
        }}
      >
        {/* Section header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          sx={{ mb: { xs: 4, md: 5 } }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Box sx={{ flex: 1, height: 1, bgcolor: "rgba(255,255,255,0.06)" }} />
            <Chip
              label="IN ACTION"
              sx={{
                bgcolor: `${ORANGE}16`,
                color: ORANGE,
                border: `1px solid ${ORANGE}40`,
                fontWeight: 800,
                fontSize: "0.68rem",
                letterSpacing: 1.5,
                height: 28,
              }}
            />
            <Box sx={{ flex: 1, height: 1, bgcolor: "rgba(255,255,255,0.06)" }} />
          </Stack>
          <Typography
            sx={{
              fontWeight: 900,
              color: "white",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textAlign: "center",
              letterSpacing: -0.5,
              mt: 1.5,
            }}
          >
            Watch Our Work
          </Typography>
          <Typography sx={{ color: "#475569", textAlign: "center", mt: 1, fontSize: { xs: "0.9rem", md: "1rem" } }}>
            Behind the scenes and project reels from our team on the ground.
          </Typography>
        </Box>

        {/* Video grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {PORTFOLIO_VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </Box>
      </Box>

      {/* ── CTA strip ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          mx: { xs: 2, sm: 4, md: 8 },
          mb: 12,
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY} 0%, #0f172a 100%)`,
          border: `1px solid ${ORANGE}20`,
          px: { xs: 4, md: 10 },
          py: { xs: 7, md: 9 },
          textAlign: "center",
        }}
      >
        {/* Glow */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 360,
            height: 360,
            background: `radial-gradient(circle, ${ORANGE}18 0%, transparent 70%)`,
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 280,
            height: 280,
            background: `radial-gradient(circle, ${ORANGE}10 0%, transparent 70%)`,
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "white",
              mb: 1.5,
              fontSize: { xs: "1.7rem", md: "2.4rem" },
              letterSpacing: -0.5,
            }}
          >
            Ready to start your next project?
          </Typography>
          <Typography sx={{ color: "#64748b", mb: 4.5, maxWidth: 480, mx: "auto", lineHeight: 1.7 }}>
            Get in touch with our team for a free consultation and quote — no obligations.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
            <Box
              component={motion.div}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Box
                component={Link}
                to="/#contact"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.2,
                  bgcolor: ORANGE,
                  color: NAVY,
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  px: 4,
                  py: 1.7,
                  borderRadius: "12px",
                  textDecoration: "none",
                  boxShadow: `0 8px 30px ${ORANGE}44`,
                  transition: "all 0.25s ease",
                  "&:hover": { bgcolor: "#ffb03a", boxShadow: `0 14px 40px ${ORANGE}66` },
                }}
              >
                Get a Free Quote →
              </Box>
            </Box>

            <Box
              component={motion.div}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Box
                component="a"
                href={`tel:${BRAND.phone}`}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.2,
                  bgcolor: "transparent",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  px: 3.5,
                  py: 1.7,
                  borderRadius: "12px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.14)",
                  transition: "all 0.25s ease",
                  "&:hover": { border: `1px solid ${ORANGE}60`, color: ORANGE, bgcolor: `${ORANGE}0c` },
                }}
              >
                {BRAND.phone}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            items={filteredWithFeatured}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}