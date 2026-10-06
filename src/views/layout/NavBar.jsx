// src/views/layout/NavBar.jsx
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { ORANGE, NAVY } from "../../theme";
import { BRAND, NAV_LINKS, SECTION_IDS, QUOTE_TARGET, navTarget } from "../../models/siteModel";
import useNavController from "../../controllers/useNavController";
import useActiveSection from "../../controllers/useActiveSection";

const logoSrc = "/images/Logo.jpg";

// Reusable Nav Link (desktop). Every link is a router link, so section links
// ("/#services") also work from other pages such as /portfolio.
const NavButton = ({ link, isActive }) => (
  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button
        component={Link}
        to={navTarget(link)}
        aria-current={isActive ? "page" : undefined}
        sx={{
          color: isActive ? ORANGE : "white",
          fontWeight: 700,
          px: 1.5,
          textTransform: "none",
          whiteSpace: "nowrap",
          fontSize: 15,
          "&:hover": { color: ORANGE, background: "transparent" },
        }}
      >
        {link.label}
      </Button>
      {isActive && (
        <motion.span
          layoutId="navUnderline"
          style={{
            display: "block",
            height: 3,
            width: "70%",
            background: ORANGE,
            borderRadius: 4,
            marginTop: 4,
          }}
        />
      )}
    </Box>
  </motion.div>
);

const QuoteButton = ({ fullWidth = false, onClick, sx }) => (
  <Button
    component={Link}
    to={QUOTE_TARGET}
    onClick={onClick}
    variant="contained"
    fullWidth={fullWidth}
    sx={{
      bgcolor: ORANGE,
      color: NAVY,
      fontWeight: 900,
      borderRadius: "10px",
      textTransform: "none",
      whiteSpace: "nowrap",
      transition: "all 0.25s ease",
      "&:hover": { bgcolor: "#ffb03a" },
      ...sx,
    }}
    endIcon={
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ display: "flex" }}
      >
        <ArrowForwardIcon />
      </motion.div>
    }
  >
    Get Quote
  </Button>
);

export default function NavBar() {
  const { open, toggle, close } = useNavController();
  const theme = useTheme();
  // 7 links + CTA don't fit in one row below ~1200px, so the hamburger menu takes over there
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const isPortfolioPage = location.pathname === "/portfolio";

  // Scroll-spy only runs on the home page; on /portfolio the Portfolio link is active
  const activeSection = useActiveSection(SECTION_IDS, !isPortfolioPage);
  const activeLink = isPortfolioPage ? "portfolio" : activeSection;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component={motion.header}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        sx={{
          top: 0,
          background: {
            xs: "rgba(30,38,66,0.98)",
            md: "linear-gradient(90deg, rgba(30,38,66,0.98), rgba(30,38,66,0.92))",
          },
          // AppBar is a Paper, and the theme gives every Paper a 1px border on all sides — keep only the bottom one
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 4, lg: 6 },
            maxWidth: "1440px",
            margin: "0 auto",
            width: "100%",
            // + the 1px bottom border = --nav-h in index.css (64px / 80px)
            minHeight: { xs: 63, md: 79 },
          }}
        >
          {/* LOGO + BRAND */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              aria-label={`${BRAND.name} — home`}
              style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
            >
              <Box className="flex items-center gap-3">
                <motion.img
                  src={logoSrc}
                  alt={`${BRAND.name} logo`}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                  whileHover={{ rotate: 6 }}
                  transition={{ type: "spring", stiffness: 220 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: ORANGE,
                      fontWeight: 900,
                      letterSpacing: 0.6,
                      lineHeight: 1.1,
                      fontSize: { xs: "1rem", md: "1.2rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {BRAND.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#cbd5e1",
                      fontSize: "0.7rem",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {BRAND.tagline}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </motion.div>

          {/* DESKTOP LINKS + CTA */}
          {!isMobile && (
            <>
              <Box
                component={motion.nav}
                aria-label="Main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto", mr: 2 }}
              >
                {NAV_LINKS.map((n) => (
                  <NavButton key={n.id} link={n} isActive={activeLink === n.id} />
                ))}
              </Box>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuoteButton
                  sx={{
                    px: 2.5,
                    py: 1,
                    boxShadow: "0 6px 18px rgba(247,163,26,0.18)",
                    "&:hover": {
                      bgcolor: "#ffb03a",
                      boxShadow: "0 8px 24px rgba(247,163,26,0.3)",
                    },
                  }}
                />
              </motion.div>
            </>
          )}

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <Box sx={{ ml: "auto" }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={toggle}
                  sx={{
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    "&:hover": { background: "rgba(255,255,255,0.1)" },
                  }}
                  aria-label="Open menu"
                  aria-expanded={open}
                  aria-controls="mobile-nav"
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
              </motion.div>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER — always mounted so it can animate out; only opens on small screens */}
      <Drawer
        id="mobile-nav"
        anchor="right"
        open={open && isMobile}
        onClose={close}
        transitionDuration={250}
        slotProps={{
          paper: {
            sx: {
              width: "86vw",
              maxWidth: 360,
              background: "linear-gradient(135deg, rgba(30,38,66,0.98), rgba(30,38,66,0.95))",
              backdropFilter: "blur(12px)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            },
          },
        }}
      >
        {/* Drawer Header */}
        <Box className="flex items-center justify-between px-4 py-3">
          <Box className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt={`${BRAND.name} logo`}
              style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 6 }}
            />
            <Typography sx={{ color: ORANGE, fontWeight: 900 }}>{BRAND.name}</Typography>
          </Box>
          <IconButton onClick={close} sx={{ color: "white" }} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Drawer Links */}
        <List component="nav" aria-label="Main" sx={{ py: 2 }}>
          {NAV_LINKS.map((n, i) => (
            <motion.div
              key={n.id}
              initial={false}
              animate={open ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
              transition={{ delay: open ? 0.1 + i * 0.05 : 0, type: "spring", stiffness: 300, damping: 18 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={navTarget(n)}
                  onClick={close}
                  selected={activeLink === n.id}
                  sx={{
                    py: 1.5,
                    px: 3,
                    "&.Mui-selected": {
                      background: "rgba(247,163,26,0.1)",
                      "& .MuiListItemText-primary": { color: ORANGE },
                    },
                    "&:hover": {
                      background: "rgba(255,255,255,0.05)",
                      "& .MuiListItemText-primary": { color: ORANGE },
                    },
                  }}
                >
                  <ListItemText
                    primary={n.label}
                    slotProps={{
                      primary: {
                        sx: {
                          color: activeLink === n.id ? ORANGE : "white",
                          fontWeight: 700,
                          fontSize: 16,
                          letterSpacing: 0.5,
                        },
                      },
                    }}
                  />
                  {activeLink === n.id && (
                    <Box
                      aria-hidden
                      sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: ORANGE, ml: 1 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        {/* CTA at Bottom */}
        <Box className="px-4 pb-6 mt-auto">
          <QuoteButton
            fullWidth
            onClick={close}
            sx={{ mt: 2, py: 1.5, boxShadow: "0 10px 30px rgba(247,163,26,0.2)" }}
          />
        </Box>
      </Drawer>
    </>
  );
}
