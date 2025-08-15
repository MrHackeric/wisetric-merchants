import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Chip,
  LinearProgress,
  Button,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

// 👉 Replace this with your actual asset path/public URL if needed
// e.g. `/images/Brochure-01.jpg` if placed in public/
const HERO_IMAGE = "/images/Brochure-01.jpg";

const ORANGE = "#f7a31a";
const NAVY = "#1e2642";

export default function MaintenancePage() {
  // 3 weeks from mount
  const launchAt = useMemo(
    () => new Date("2025-08-20T00:00:00+03:00"), // Nairobi timezone
    []
  );

  const [timeLeft, setTimeLeft] = useState(getTimeParts(launchAt));
  const rafRef = useRef(null);

  // Progress (0–100)
  const progress = useMemo(() => {
    const total = 21 * 24 * 60 * 60 * 1000; // ms in 3 weeks
    const remaining = Math.max(0, launchAt.getTime() - Date.now());
    return Math.min(100, Math.max(0, ((total - remaining) / total) * 100));
  }, [timeLeft, launchAt]);

  // Real-time ticker using requestAnimationFrame (smooth, microseconds derived from high-res time)
  useEffect(() => {
    const tick = () => {
      setTimeLeft(getTimeParts(launchAt));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [launchAt]);

  const isLive = timeLeft.totalMs <= 0;

  return (
    <Box
      className="min-h-screen w-full"
      sx={{
        background: `linear-gradient(180deg, rgba(8,12,24,0.9), rgba(8,12,24,0.85))`,
      }}
    >
      {/* Background image layer */}
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(20%) contrast(1.05) brightness(0.7)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg" className="py-10 md:py-14">
        <Paper
          elevation={6}
          component={motion.div}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            overflow: "hidden",
            borderRadius: "1.25rem",
            background:
              "linear-gradient(135deg, rgba(30,38,66,0.85), rgba(30,38,66,0.75))",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Top bar */}
          <Box
            className="flex items-center gap-3 px-5 sm:px-8 py-4"
            sx={{
              background:
                "linear-gradient(90deg, rgba(247,163,26,0.18), rgba(247,163,26,0.05))",
            }}
          >
            <Box
              className="flex items-center justify-center rounded-xl"
              sx={{
                width: 44,
                height: 44,
                backgroundColor: ORANGE,
                color: NAVY,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              M
            </Box>
            <Box className="flex-1">
              <Typography
                variant="h5"
                className="font-bold tracking-wide"
                sx={{ color: ORANGE }}
              >
                WISETRIC MERCHANTS
              </Typography>
              <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                Electrical Consultation • Film & Event Lighting • Renovation •
                Supply of Electrical Materials
              </Typography>
            </Box>

            <Tooltip title="We’ll be back soon!">
              <Chip
                label="Undergoing Maintenance"
                sx={{
                  bgcolor: "rgba(247,163,26,0.15)",
                  color: ORANGE,
                  border: `1px solid ${ORANGE}55`,
                  fontWeight: 700,
                }}
              />
            </Tooltip>
          </Box>

          {/* Main */}
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-5 sm:p-8">
            {/* Left: message & countdown */}
            <Box className="space-y-6">
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Typography
                  variant="h3"
                  className="font-extrabold leading-tight"
                  sx={{ color: "white" }}
                >
                  Our website is getting{" "}
                  <Box component="span" sx={{ color: ORANGE }}>
                    brighter
                  </Box>
                  .
                </Typography>
                <Typography sx={{ color: "#d1d5db", mt: 1.5 }}>
                  We’re performing upgrades to serve you better. Please check
                  back when the countdown hits zero.
                </Typography>
              </Box>

              {/* Countdown cards */}
              <Stack
                direction="row"
                className="flex-wrap"
                spacing={1.5}
                useFlexGap
              >
                <TimeCard label="Weeks" value={timeLeft.weeks} />
                <TimeCard label="Days" value={timeLeft.days} />
                <TimeCard label="Hours" value={timeLeft.hours} />
                <TimeCard label="Minutes" value={timeLeft.minutes} />
                <TimeCard label="Seconds" value={timeLeft.seconds} />
                <TimeCard label="Milliseconds" value={timeLeft.milliseconds} pad={3} />
                <TimeCard label="Microseconds" value={timeLeft.microseconds} pad={3} />
              </Stack>

              {/* Progress */}
              <Box>
                <Box className="flex items-center justify-between mb-2">
                  <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                    Progress
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: ORANGE, fontWeight: 700 }}
                  >
                    {progress.toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 9999,
                    bgcolor: "rgba(255,255,255,0.12)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: ORANGE,
                    },
                  }}
                />
              </Box>

              {/* Contact / CTA */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                className="pt-2"
              >
                <Button
                  variant="contained"
                  size="large"
                  component={motion.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    bgcolor: ORANGE,
                    color: NAVY,
                    fontWeight: 800,
                    borderRadius: "9999px",
                    px: 3,
                    "&:hover": { bgcolor: "#ffa51c" },
                  }}
                  href="mailto:info@wisetricmerchants.co.ke"
                >
                  Email Us
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={motion.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    borderColor: `${ORANGE}99`,
                    color: ORANGE,
                    fontWeight: 700,
                    borderRadius: "9999px",
                    px: 3,
                    "&:hover": { borderColor: ORANGE, backgroundColor: "transparent" },
                  }}
                  href="tel:+254715253208"
                >
                  +254 715 253 208
                </Button>
              </Stack>
            </Box>

            {/* Right: location & brand card */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex"
            >
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: { xs: 3, sm: 4 },
                  borderRadius: "1rem",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#e5e7eb", fontWeight: 800, mb: 1 }}
                >
                  Company Info
                </Typography>
                <Divider
                  sx={{
                    borderColor: "rgba(255,255,255,0.12)",
                    mb: 2,
                  }}
                />
                <Stack spacing={1.25}>
                  <InfoRow label="Company" value="WISETRIC MERCHANTS" />
                  <InfoRow label="Location" value="Karen Village, Nairobi" />
                  <InfoRow label="Tel" value="+254 715 253 208" />
                  <InfoRow
                    label="Website"
                    value="www.wisetricmerchants.co.ke"
                    link="https://www.wisetricmerchants.co.ke"
                  />
                  <InfoRow
                    label="Services"
                    value="Electrical Consultation · Film & Event Lighting · Renovation · Supply of Electrical Materials"
                  />
                </Stack>

                <Box className="mt-6">
                  <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                    Launching on:
                  </Typography>
                  <Typography variant="h6" sx={{ color: ORANGE, fontWeight: 800 }}>
                    {launchAt.toLocaleString()}
                  </Typography>
                </Box>

                <Box
                  className="mt-6 rounded-xl overflow-hidden h-40 sm:h-52"
                  sx={{
                    backgroundImage: `url(${HERO_IMAGE})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(30,38,66,0.0), rgba(30,38,66,0.75))",
                    }}
                  />
                  <Box
                    className="absolute bottom-3 left-3 right-3 flex items-center justify-between"
                    component={motion.div}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", fontWeight: 800 }}
                    >
                      We’ll be live soon
                    </Typography>
                    <Chip
                      label={isLive ? "LIVE" : "COMING SOON"}
                      sx={{
                        bgcolor: isLive ? "#10b981" : "rgba(247,163,26,0.2)",
                        color: isLive ? "white" : ORANGE,
                        fontWeight: 800,
                        border: isLive ? "none" : `1px solid ${ORANGE}55`,
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>

          {/* Footer */}
          <Box className="px-5 sm:px-8 py-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              © {new Date().getFullYear()} Wisetric Merchants. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
              “Lighting up ideas with precision.”
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

/* ---------- Helpers ---------- */

function TimeCard({ label, value, pad = 2 }) {
  const v =
    typeof value === "number"
      ? value.toString().padStart(pad, "0")
      : String(value);
  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="px-4 py-3 rounded-2xl"
      sx={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        minWidth: 110,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: 900, lineHeight: 1 }}
      >
        {v}
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: "#cbd5e1", letterSpacing: 1, textTransform: "uppercase" }}
      >
        {label}
      </Typography>
    </Paper>
  );
}

function InfoRow({ label, value, link }) {
  return (
    <Box className="grid grid-cols-3 gap-3">
      <Typography
        variant="body2"
        sx={{ color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        className="col-span-2"
        sx={{
          color: "white",
          fontWeight: 600,
          wordBreak: "break-word",
        }}
      >
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="underline">
            {value}
          </a>
        ) : (
          value
        )}
      </Typography>
    </Box>
  );
}

function getTimeParts(launchAt) {
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const minMs = 60 * 1000;
  const secMs = 1000;

  // High-resolution current time (ms with fraction)
  const nowHighMs = performance.timeOrigin + performance.now();
  const remainMsHigh = launchAt.getTime() - nowHighMs;

  const totalMs = Math.max(0, Math.floor(remainMsHigh)); // truncate to ms
  const microFrac = Math.max(
    0,
    Math.floor((remainMsHigh - Math.floor(remainMsHigh)) * 1000)
  ); // 0..999 microseconds

  let rem = totalMs;

  const weeks = Math.floor(rem / weekMs);
  rem %= weekMs;

  const days = Math.floor(rem / dayMs);
  rem %= dayMs;

  const hours = Math.floor(rem / hourMs);
  rem %= hourMs;

  const minutes = Math.floor(rem / minMs);
  rem %= minMs;

  const seconds = Math.floor(rem / secMs);
  rem %= secMs;

  const milliseconds = rem;

  return {
    totalMs,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    microseconds: microFrac,
  };
}
