// src/views/components/Contact.jsx
import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Chip,
  Container,
  Snackbar,
  Alert,
  Box,
  IconButton,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ORANGE, NAVY } from "../../theme";
import { BRAND } from "../../models/siteModel";

const floatUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const reasonsList = [
  "Request a quote",
  "Schedule a site visit",
  "Technical support",
  "Product enquiry",
  "Other",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [toast, setToast] = useState({ open: false, type: "success", msg: "" });
  const [status, setStatus] = useState("idle"); // idle | success | error

  const handleReasonToggle = (reason) => {
    setSelectedReason((prev) => (prev === reason ? "" : reason));
  };

  const buildMessagePlain = () => {
    const who = name?.trim() ? name.trim() : "a visitor";
    const why = selectedReason || "your services";
    return `Hello ${BRAND.name}, I'm ${who} and would like to enquire about ${why}.`;
  };

  const buildMessageForUrl = () => encodeURIComponent(buildMessagePlain());

  const showToast = (type, msg) => {
    setToast({ open: true, type, msg });
  };

  const openWhatsApp = () => {
    if (!selectedReason) {
      showToast("error", "Please choose a reason for contacting us.");
      return;
    }
    try {
      const cleaned = String(BRAND.phone || "").replace(/\D/g, "");
      const msg = buildMessageForUrl();
      const url =
        cleaned.length > 0
          ? `https://wa.me/${cleaned}?text=${msg}`
          : `https://web.whatsapp.com/send?text=${msg}`;

      window.open(url, "_blank", "noopener,noreferrer");
      showToast("success", "Opening WhatsApp...");
      setStatus("success");
    } catch {
      showToast("error", "Failed to open WhatsApp.");
      setStatus("error");
    }
  };

  const openMailClient = () => {
    if (!selectedReason) {
      showToast("error", "Please choose a reason for contacting us.");
      return;
    }
    try {
      const subject = encodeURIComponent(`Website enquiry from ${name || "visitor"}`);
      const body = encodeURIComponent(buildMessagePlain());
      window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
      showToast("success", "Opening mail client...");
      setStatus("success");
    } catch {
      showToast("error", "Failed to open mail client.");
      setStatus("error");
    }
  };

  const socials = [
    { key: "facebook", url: BRAND.social?.facebook, icon: <FacebookIcon /> },
    { key: "instagram", url: BRAND.social?.instagram, icon: <InstagramIcon /> },
    {
      key: "tiktok",
      url: BRAND.social?.tiktok,
      icon: (
        <Box
          component="img"
          src="/images/tiktok.png"
          alt="TikTok"
          sx={{ width: 28, height: 28, borderRadius: 1 }}
        />
      ),
    },
    { key: "twitter", url: BRAND.social?.twitter, icon: <TwitterIcon /> },
    { key: "linkedin", url: BRAND.social?.linkedin, icon: <LinkedInIcon /> },
  ].filter((s) => s.url);

  return (
    <BoxWrapper>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Title */}
        <motion.div variants={floatUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 900,
              color: "white",
              mb: 1.5,
              "& span": { color: ORANGE },
            }}
          >
            Contact <span>Us</span>
          </Typography>
          <Typography sx={{ color: "#cbd5e1", textAlign: "center", mb: 4 }}>
            Quick and simple — tell us your name and why you're reaching out.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {/* Left: Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                  color: "white",
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Stack spacing={2}>
                  <TextField
                    label="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    variant="outlined"
                    InputLabelProps={{ sx: { color: "#cbd5e1" } }}
                    InputProps={{
                      sx: {
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.12)" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: `${ORANGE}88` },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: ORANGE },
                      },
                    }}
                  />

                  {/* Reason checkboxes */}
                  <Box>
                    <Typography sx={{ color: "#cbd5e1", mb: 1 }}>Reason for contacting us</Typography>
                    <Stack direction="column" spacing={1}>
                      {reasonsList.map((r) => (
                        <motion.div
                          key={r}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedReason === r}
                                onChange={() => handleReasonToggle(r)}
                                sx={{ color: "white", "&.Mui-checked": { color: ORANGE } }}
                              />
                            }
                            label={<Typography sx={{ color: "white", fontSize: 14 }}>{r}</Typography>}
                          />
                        </motion.div>
                      ))}
                    </Stack>
                  </Box>

                  {/* Preview */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.017)",
                      border: "1px dashed rgba(255,255,255,0.04)",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#cbd5e1" }}>
                      Preview (what will be sent)
                    </Typography>
                    <Typography sx={{ color: "white", mt: 1, whiteSpace: "pre-wrap" }}>
                      {buildMessagePlain()}
                    </Typography>
                  </Paper>

                  {/* Status */}
                  <AnimatePresence>
                    {status !== "idle" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <Chip
                          icon={status === "success" ? <CheckCircleIcon /> : <ErrorIcon />}
                          label={
                            status === "success"
                              ? "Ready — choose WhatsApp or Email"
                              : "There was an issue. Try again."
                          }
                          color={status === "success" ? "success" : "error"}
                          sx={{ width: "100%", py: 1.1, fontSize: "0.9rem" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action buttons */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button
                      variant="contained"
                      onClick={openWhatsApp}
                      startIcon={<SendIcon />}
                      sx={{
                        bgcolor: "#25D366",
                        color: "white",
                        fontWeight: 800,
                        px: 3,
                        height: 48,
                        borderRadius: 2,
                        "&:hover": { opacity: 0.95 },
                      }}
                    >
                      Open WhatsApp
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={openMailClient}
                      startIcon={<EmailIcon />}
                      sx={{
                        borderColor: `${ORANGE}88`,
                        color: ORANGE,
                        fontWeight: 800,
                        px: 3,
                        height: 48,
                        borderRadius: 2,
                        "&:hover": { borderColor: ORANGE },
                      }}
                    >
                      Email Us
                    </Button>

                    <Tooltip title={`Call ${BRAND.phone}`}>
                      <IconButton
                        aria-label="call"
                        href={`tel:${String(BRAND.phone || "").replace(/\s/g, "")}`}
                        sx={{
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.1)",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                        }}
                      >
                        <LocalPhoneIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>

          {/* Right: Info card */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  borderRadius: 3,
                  color: "white",
                  height: "100%",
                  background:
                    "radial-gradient(900px circle at 10% -20%, rgba(247,163,26,0.06), transparent 40%), linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  Let’s build something great
                </Typography>
                <Typography sx={{ color: "#cbd5e1", mb: 1.5 }}>
                  We handle wiring, lighting, renovation and supply. Reach out and we'll get back
                  quickly.
                </Typography>

                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  <Row
                    icon={<EmailIcon sx={{ color: ORANGE }} />}
                    text={BRAND.email}
                    href={`mailto:${BRAND.email}`}
                  />
                  <Row
                    icon={<LocalPhoneIcon sx={{ color: ORANGE }} />}
                    text={BRAND.phone}
                    href={`tel:${String(BRAND.phone || "").replace(/\s/g, "")}`}
                  />
                  <Row icon={<OpenInNewIcon sx={{ color: ORANGE }} />} text={BRAND.location} />
                </Stack>

                {/* Socials */}
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#cbd5e1", mb: 1 }}>Find us on</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {socials.map((s) => (
                      <Tooltip key={s.key} title={s.key.charAt(0).toUpperCase() + s.key.slice(1)}>
                        <IconButton
                          aria-label={s.key}
                          onClick={() => window.open(s.url, "_blank", "noopener,noreferrer")}
                          sx={{
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "white",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                            width: 44,
                            height: 44,
                          }}
                        >
                          {s.icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Stack>
                </Box>

                {/* Services */}
                <Box sx={{ mt: "auto", display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>Services</Typography>
                  <Stack direction="row" spacing={1} sx={{ ml: 1, flexWrap: "wrap" }}>
                    {["Wiring", "Interior", "Lighting", "Maintenance"].map((x) => (
                      <Chip
                        key={x}
                        label={x}
                        sx={{ color: ORANGE, borderColor: ORANGE }}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </BoxWrapper>
  );
}

/** Gradient Wrapper */
function BoxWrapper({ children }) {
  return (
    <Box
      sx={{
        position: "relative",
        background: `linear-gradient(135deg, ${NAVY} 0%, #0f172a 100%)`,
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: -260,
          right: -260,
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(247,163,26,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}

/** Row (icon + text) */
function Row({ icon, text, href }) {
  const content = (
    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        {icon}
        <Typography sx={{ color: "white" }}>{text}</Typography>
      </Stack>
    </motion.div>
  );
  return href ? (
    <a href={href} style={{ textDecoration: "none" }}>
      {content}
    </a>
  ) : (
    content
  );
}
