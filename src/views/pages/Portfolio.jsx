import React, { useState, useCallback } from "react";
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
import { Link } from "react-router-dom";
import { ORANGE, NAVY } from "../../theme";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "../../models/siteModel";

// ─── Floating particle background ───────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 5,
  duration: 6 + Math.random() * 8,
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
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
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

// ─── Category filter pill ────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
      <Chip
        label={label}
        onClick={onClick}
        sx={{
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "0.85rem",
          px: 1.5,
          height: 38,
          bgcolor: active ? ORANGE : "rgba(255,255,255,0.06)",
          color: active ? NAVY : "white",
          border: active ? "none" : "1px solid rgba(255,255,255,0.12)",
          boxShadow: active ? `0 4px 18px ${ORANGE}55` : "none",
          transition: "all 0.25s ease",
          "&:hover": {
            bgcolor: active ? "#ffb03a" : "rgba(255,255,255,0.10)",
          },
        }}
      />
    </motion.div>
  );
}

// ─── Gallery card ────────────────────────────────────────────────────────────
function GalleryCard({ item, index, layout, onClick }) {
  const [hovered, setHovered] = useState(false);

  // In masonry mode give alternate cards a taller height for visual variety
  const cardHeight =
    layout === "masonry"
      ? index % 3 === 0
        ? { xs: 240, sm: 320, md: 380 }
        : { xs: 220, sm: 280, md: 320 }
      : { xs: 220, sm: 280, md: 320 };

  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: index * 0.055, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        height: cardHeight,
        cursor: "pointer",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.55)"
          : "0 6px 20px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.3s ease",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Image */}
      <Box
        component={motion.img}
        src={item.image}
        alt={item.title}
        loading="lazy"
        animate={{ scale: hovered ? 1.08 : 1.01 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Gradient overlay — always visible at bottom */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(6,10,30,0.92) 0%, rgba(6,10,30,0.3) 45%, rgba(6,10,30,0) 70%)",
        }}
      />

      {/* Hover overlay (darkens whole card) */}
      <Box
        component={motion.div}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(6,10,30,0.45)",
        }}
      />

      {/* Category badge top-right */}
      <Box
        component={motion.div}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
        transition={{ duration: 0.25 }}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
        }}
      >
        <Chip
          label={item.category}
          size="small"
          sx={{
            bgcolor: `${ORANGE}cc`,
            color: NAVY,
            fontWeight: 800,
            fontSize: "0.72rem",
          }}
        />
      </Box>

      {/* Zoom icon centre */}
      <Box
        component={motion.div}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.25 }}
        sx={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
          borderRadius: "50%",
          width: 52,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <ZoomInIcon sx={{ color: "white", fontSize: 26 }} />
      </Box>

      {/* Bottom text */}
      <Stack
        spacing={0.5}
        sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: { xs: 2, md: 2.5 } }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "white", lineHeight: 1.2, fontSize: { xs: "0.95rem", md: "1.05rem" } }}
        >
          {item.title}
        </Typography>
        <Box
          component={motion.div}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="body2" sx={{ color: "#cbd5e1", fontSize: "0.8rem" }}>
            {item.description}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const item = items[currentIndex];

  // Keyboard nav
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onClose]);

  return (
    <Modal
      open
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300, sx: { bgcolor: "rgba(0,0,0,0.92)" } } }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1500 }}
    >
      <Fade in>
        <Box
          sx={{
            position: "relative",
            outline: "none",
            width: { xs: "96vw", sm: "88vw", md: "78vw" },
            maxWidth: 1100,
          }}
        >
          {/* Counter */}
          <Typography
            sx={{
              position: "absolute",
              top: -36,
              left: 0,
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {currentIndex + 1} / {items.length}
          </Typography>

          {/* Close */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: -44,
              right: 0,
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Image container */}
          <AnimatePresence mode="wait">
            <Box
              key={item.id}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: "100%",
                  maxHeight: "75vh",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Caption bar */}
              <Box
                sx={{
                  p: { xs: 2, md: 3 },
                  background: `linear-gradient(135deg, ${NAVY}f0, #0f172af0)`,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "white" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={item.category}
                    sx={{ bgcolor: `${ORANGE}22`, color: ORANGE, border: `1px solid ${ORANGE}55`, fontWeight: 700 }}
                  />
                </Stack>
              </Box>
            </Box>
          </AnimatePresence>

          {/* Prev / Next */}
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
                top: "45%",
                [side]: { xs: -18, sm: -28 },
                transform: "translateY(-50%)",
                bgcolor: disabled ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: disabled ? "rgba(255,255,255,0.2)" : "white",
                backdropFilter: "blur(6px)",
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

// ─── Main Portfolio page ─────────────────────────────────────────────────────
export default function Portfolio() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeCategory, setActiveCategory] = useState("All");
  const [layout, setLayout] = useState("grid"); // "grid" | "masonry"
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => Math.max(0, i - 1)),
    []
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => Math.min(filtered.length - 1, i + 1)),
    [filtered.length]
  );

  const gridCols =
    layout === "masonry"
      ? { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }
      : { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, #06101e 0%, #0f172a 40%, ${NAVY}66 100%)`,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ── Hero header ── */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
          px: { xs: 3, sm: 5, md: 10 },
          overflow: "hidden",
        }}
      >
        <ParticleField />

        {/* Glow blob */}
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
          sx={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            background: `radial-gradient(ellipse, ${ORANGE}22 0%, transparent 70%)`,
            borderRadius: "50%",
            zIndex: 0,
            filter: "blur(30px)",
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
              color: "#94a3b8",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "color 0.2s ease",
              "&:hover": { color: ORANGE },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            Back to Home
          </Box>
        </Box>

        {/* Title block */}
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Chip
              label="OUR COMPLETED PROJECTS"
              sx={{
                bgcolor: `${ORANGE}18`,
                color: ORANGE,
                border: `1px solid ${ORANGE}44`,
                fontWeight: 700,
                mb: 3,
                px: 2,
                letterSpacing: 1,
                fontSize: "0.75rem",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.6rem", sm: "3.5rem", md: "4.5rem" },
                lineHeight: 1.05,
                mb: 3,
                letterSpacing: -1,
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
                    height: 10,
                    bgcolor: `${ORANGE}28`,
                    zIndex: -1,
                    borderRadius: 2,
                  },
                }}
              >
                Portfolio
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: { xs: "1rem", md: "1.2rem" },
                maxWidth: 560,
                mx: "auto",
              }}
            >
              A showcase of our electrical, lighting, renovation, and
              commissioning work across Kenya.
            </Typography>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 3, md: 6 }}
              justifyContent="center"
              sx={{ mt: 5 }}
            >
              {[
                { value: "200+", label: "Projects Done" },
                { value: "50+", label: "Happy Clients" },
                { value: "8+", label: "Years Active" },
              ].map((stat) => (
                <Box key={stat.label} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.6rem", md: "2.2rem" },
                      fontWeight: 900,
                      color: ORANGE,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 600, mt: 0.5 }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </motion.div>
        </Box>
      </Box>

      {/* ── Filter & layout controls ── */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        sx={{
          px: { xs: 3, sm: 5, md: 10 },
          mb: { xs: 4, md: 5 },
          position: "sticky",
          top: 72,
          zIndex: 100,
          py: 2,
          background: "rgba(6,16,40,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          {/* Category pills */}
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </Stack>

          {/* Layout toggle + count */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography sx={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 600 }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {[
                { mode: "grid", icon: <GridViewIcon sx={{ fontSize: 20 }} /> },
                { mode: "masonry", icon: <AutoAwesomeMosaicIcon sx={{ fontSize: 20 }} /> },
              ].map(({ mode, icon }) => (
                <IconButton
                  key={mode}
                  onClick={() => setLayout(mode)}
                  size="small"
                  sx={{
                    color: layout === mode ? ORANGE : "#64748b",
                    bgcolor: layout === mode ? `${ORANGE}18` : "transparent",
                    border: layout === mode ? `1px solid ${ORANGE}44` : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 1.5,
                    transition: "all 0.2s ease",
                    "&:hover": { color: ORANGE, bgcolor: `${ORANGE}14` },
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
      <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, pb: { xs: 8, md: 14 } }}>
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <Box
              key="empty"
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{ textAlign: "center", py: 14 }}
            >
              <Typography sx={{ color: "#475569", fontSize: "1.1rem" }}>
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
              transition={{ duration: 0.25 }}
              sx={{
                display: "grid",
                gridTemplateColumns: gridCols,
                gap: { xs: 2, md: 3 },
                alignItems: layout === "masonry" ? "start" : "stretch",
              }}
            >
              {filtered.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  layout={layout}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </Box>
          )}
        </AnimatePresence>
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
          mb: 10,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY} 0%, #0f172a 100%)`,
          border: "1px solid rgba(255,255,255,0.08)",
          px: { xs: 4, md: 10 },
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        {/* Glow accent */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            background: `radial-gradient(circle, ${ORANGE}20 0%, transparent 70%)`,
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "white", mb: 1.5, fontSize: { xs: "1.6rem", md: "2.2rem" } }}
          >
            Ready to start your project?
          </Typography>
          <Typography sx={{ color: "#94a3b8", mb: 4, maxWidth: 500, mx: "auto" }}>
            Get in touch with our team for a free consultation and quote.
          </Typography>

          <Box
            component={motion.div}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            sx={{ display: "inline-block" }}
          >
            <Box
              component={Link}
              to="/#contact"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                bgcolor: ORANGE,
                color: NAVY,
                fontWeight: 900,
                fontSize: "1rem",
                px: 4,
                py: 1.6,
                borderRadius: "10px",
                textDecoration: "none",
                boxShadow: `0 8px 28px ${ORANGE}44`,
                transition: "all 0.25s ease",
                "&:hover": { bgcolor: "#ffb03a", boxShadow: `0 12px 36px ${ORANGE}66` },
              }}
            >
              Get a Free Quote →
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}
