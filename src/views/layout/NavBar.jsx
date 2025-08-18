// src/views/layout/NavBar.jsx
import React from "react";
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
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, AnimatePresence } from "framer-motion";

import { ORANGE, NAVY } from "../../theme";
import { BRAND, NAV_LINKS } from "../../models/siteModel";
import useNavController from "../../controllers/useNavController";

// LOGO (use from public/images or import from src/assets)
const logoSrc = "/images/Logo.jpg";

// Reusable Nav Link (desktop)
const NavButton = ({ to, label, isActive }) => (
  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
    <Box
      className="px-2"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        href={`#${to}`}
        sx={{
          color: isActive ? ORANGE : "white",
          fontWeight: 700,
          px: 1.5,
          textTransform: "none",
          fontSize: { xs: 14, md: 15 },
          "&:hover": { color: ORANGE, background: "transparent" },
        }}
      >
        {label}
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


export default function NavBar() {
  const { open, toggle, close } = useNavController();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeLink, setActiveLink] = React.useState("");

  // Track active link based on scroll position
  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = NAV_LINKS.map(link => document.getElementById(link.id));
          const scrollPosition = window.scrollY + 120;
          for (const section of sections) {
            if (!section) continue;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              setActiveLink(section.id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component={motion.div}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        sx={{
          top: 0,
          background: {
            xs: "rgba(30,38,66,0.98)",
            md: "linear-gradient(90deg, rgba(30,38,66,0.98), rgba(30,38,66,0.92))"
          },
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
            width: "100%"
          }}
        >
          {/* LOGO + BRAND */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <Box className="flex items-center gap-3">
                <motion.img
                  src={logoSrc}
                  alt={`${BRAND.name} logo`}
                  onError={(e) => { e.target.style.display = "none"; }}
                  style={{
                    width: 88,
                    height: 88,
                    objectFit: "contain",
                    borderRadius: 8,
                    marginRight: 20,
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
            </a>
          </motion.div>

          {/* DESKTOP LINKS - Only shown on larger screens */}
          {!isMobile && (
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                ml: "auto",
                mr: 2
              }}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {NAV_LINKS.map((n) => (
                <NavButton 
                  key={n.id} 
                  to={n.id} 
                  label={n.label} 
                  isActive={activeLink === n.id}
                />
              ))}
            </Box>
          )}

          {/* CTA Button - Desktop */}
          {!isMobile && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                href="#contact"
                variant="contained"
                sx={{
                  bgcolor: ORANGE,
                  color: NAVY,
                  fontWeight: 900,
                  px: 2.5,
                  py: 1,
                  borderRadius: "10px",
                  textTransform: "none",
                  boxShadow: "0 6px 18px rgba(247,163,26,0.18)",
                  transition: "all 0.25s ease",
                  "&:hover": { 
                    bgcolor: "#ffb03a",
                    boxShadow: "0 8px 24px rgba(247,163,26,0.3)"
                  },
                }}
                endIcon={
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowForwardIcon />
                  </motion.div>
                }
              >
                Get Quote
              </Button>
            </motion.div>
          )}

          {/* MOBILE MENU BUTTON - Only shown on mobile */}
          {isMobile && (
            <Box sx={{ ml: "auto" }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  onClick={toggle}
                  sx={{
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    "&:hover": { background: "rgba(255,255,255,0.1)" },
                  }}
                  aria-label="menu"
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
              </motion.div>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobile && open && (
          <Drawer
            anchor="right"
            open={open}
            onClose={close}
            transitionDuration={250}
            PaperProps={{
              sx: {
                width: "86vw",
                maxWidth: 360,
                background:
                  "linear-gradient(135deg, rgba(30,38,66,0.98), rgba(30,38,66,0.95))",
                backdropFilter: "blur(12px)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              },
            }}
          >
            {/* Drawer Header */}
            <Box className="flex items-center justify-between px-4 py-3">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Box className="flex items-center gap-3">
                  <img
                    src={logoSrc}
                    alt={`${BRAND.name} logo`}
                    style={{
                      width: 36,
                      height: 36,
                      objectFit: "contain",
                      borderRadius: 6,
                    }}
                  />
                  <Typography sx={{ color: ORANGE, fontWeight: 900 }}>
                    {BRAND.name}
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton 
                  onClick={close} 
                  sx={{ color: "white" }}
                >
                  <CloseIcon />
                </IconButton>
              </motion.div>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Drawer Links */}
            <List sx={{ py: 2 }}>
              {NAV_LINKS.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.1 + i * 0.05, 
                    type: "spring", 
                    stiffness: 300,
                    damping: 10
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      component="a"
                      href={`#${n.id}`}
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
                          "& .MuiListItemText-primary": { color: ORANGE } 
                        },
                      }}
                    >
                      <ListItemText
                        primary={n.label}
                        primaryTypographyProps={{
                          sx: { 
                            color: activeLink === n.id ? ORANGE : "white", 
                            fontWeight: 700, 
                            fontSize: 16,
                            letterSpacing: 0.5
                          },
                        }}
                      />
                      {activeLink === n.id && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: ORANGE,
                            marginLeft: 8
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </List>

            {/* CTA at Bottom */}
            <Box className="px-4 pb-6 mt-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  href="#contact"
                  variant="contained"
                  fullWidth
                  onClick={close}
                  sx={{
                    mt: 2,
                    bgcolor: ORANGE,
                    color: NAVY,
                    fontWeight: 900,
                    py: 1.5,
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(247,163,26,0.2)",
                    "&:hover": { 
                      bgcolor: "#ffb03a",
                      boxShadow: "0 12px 36px rgba(247,163,26,0.3)"
                    },
                  }}
                  endIcon={
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ArrowForwardIcon />
                    </motion.div>
                  }
                >
                  Get Quote
                </Button>
              </motion.div>
            </Box>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
}