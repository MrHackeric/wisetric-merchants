import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  Divider,
  Button,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BRAND, NAV_LINKS, navTarget } from "../../models/siteModel";
import { ORANGE } from "../../theme";

const Row = ({ icon, text, href }) => {
  const content = (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {icon}
      <Typography sx={{ color: "#cbd5e1" }}>{text}</Typography>
    </Stack>
  );
  if (!href) return content;
  const external = /^https?:/i.test(href);
  return (
    <MuiLink
      href={href}
      underline="none"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </MuiLink>
  );
};

const TikTokIcon = () => (
  <Box
    component="img"
    src="/images/tiktok.png"
    alt=""
    sx={{
      width: 24,
      height: 24,
      objectFit: "contain",
      filter: "grayscale(100%) brightness(0.9)",
      transition: "filter 0.3s ease",
      ".MuiIconButton-root:hover &": { filter: "grayscale(0%) brightness(1)" },
    }}
  />
);

const SOCIALS = [
  { key: "facebook", label: "Facebook", icon: <FacebookIcon />, hover: "#1877f2" },
  { key: "instagram", label: "Instagram", icon: <InstagramIcon />, hover: "#e4405f" },
  { key: "tiktok", label: "TikTok", icon: <TikTokIcon />, hover: "#ffffff" },
  { key: "twitter", label: "X (Twitter)", icon: <TwitterIcon />, hover: "#1da1f2" },
  { key: "linkedin", label: "LinkedIn", icon: <LinkedInIcon />, hover: "#0a66c2" },
];

const FooterLink = ({ to, label }) => (
  <Button
    component={Link}
    to={to}
    sx={{
      justifyContent: "flex-start",
      color: "#cbd5e1",
      fontWeight: 700,
      px: 0,
      minWidth: 0,
      textTransform: "none",
      "&:hover": { color: ORANGE, background: "transparent" },
    }}
    endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
  >
    {label}
  </Button>
);

export default function Footer() {
  const logoSrc = "/images/Logo.jpg";

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        bgcolor: "#061028",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ width: "100%", px: { xs: 3, sm: 6, md: 12 } }}>
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, bgcolor: "transparent" }}>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {/* Logo & Description */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <motion.img
                  src={logoSrc}
                  alt={`${BRAND.name} logo`}
                  style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover" }}
                  animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.06, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
                />

                <Box>
                  <Typography
                    variant="h6"
                    sx={{ color: ORANGE, fontWeight: 900, lineHeight: 1 }}
                  >
                    {BRAND.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#cbd5e1" }}>
                    “Lighting up ideas with precision.”
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ color: "#cbd5e1", mt: 2 }}>
                Electrical Consultation • Film & Event Lighting • Renovation • Supply of Electrical
                Materials
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography sx={{ color: "white", fontWeight: 800, mb: 1 }}>
                Quick Links
              </Typography>
              <Stack sx={{ alignItems: { xs: "center", md: "flex-start" } }}>
                {NAV_LINKS.map((n) => (
                  <FooterLink key={n.id} to={navTarget(n)} label={n.label} />
                ))}
              </Stack>
            </Grid>

            {/* Contact Info & Socials */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography sx={{ color: "white", fontWeight: 800, mb: 1 }}>
                Get in Touch
              </Typography>
              <Stack spacing={1} sx={{ alignItems: { xs: "center", md: "flex-start" } }}>
                <Row
                  icon={<EmailIcon sx={{ color: ORANGE }} />}
                  text={BRAND.email}
                  href={`mailto:${BRAND.email}`}
                />
                <Row
                  icon={<LocalPhoneIcon sx={{ color: ORANGE }} />}
                  text={BRAND.phone}
                  href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                />
                <Row
                  icon={<LocationOnIcon sx={{ color: ORANGE }} />}
                  text={BRAND.location}
                />
              </Stack>

              {/* Social Icons */}
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mt: 2, justifyContent: { xs: "center", md: "flex-start" } }}
              >
                {SOCIALS.map((social) => (
                  <IconButton
                    key={social.key}
                    component="a"
                    href={BRAND.social[social.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{ color: "#cbd5e1", "&:hover": { color: social.hover } }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {/* Bottom Section */}
            <Grid size={12}>
              <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#94a3b8", textAlign: { xs: "center", sm: "left" } }}
                >
                  © {new Date().getFullYear()} Wisetric Merchants. All rights reserved.
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ justifyContent: { xs: "center", sm: "flex-end" } }}
                >
                  <Chip
                    label="Safety First"
                    icon={<CheckCircleIcon />}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "white",
                      "& .MuiChip-icon": { color: ORANGE },
                    }}
                  />
                  <Chip
                    label="On-time Delivery"
                    icon={<BoltIcon />}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "white",
                      "& .MuiChip-icon": { color: ORANGE },
                    }}
                  />
                </Stack>
              </Box>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                  Designed by{" "}
                  <MuiLink
                    href="https://github.com/MrHackeric"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: ORANGE, fontWeight: 700 }}
                  >
                    MrHackeric
                  </MuiLink>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
