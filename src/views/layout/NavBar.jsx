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
import { Link, useLocation } from "react-router-dom";

import { ORANGE, NAVY } from "../../theme";
import { BRAND, NAV_LINKS, SECTION_IDS, QUOTE_TARGET, navTarget } from "../../models/siteModel";
import useNavController from "../../controllers/useNavController";
import useActiveSection from "../../controllers/useActiveSection";

// Lightweight 21 KB optimized logo instead of the original 721 KB file
const logoSrc = "/images/logo-sm.jpg";

// Reusable Nav Link (desktop). Every link is a router link, so section links
// ("/#services") also work from other pages such as /portfolio.
const NavButton = ({ link, isActive }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
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
        transition: "color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          color: ORANGE,
          background: "transparent",
          transform: "translateY(-2px)",
        },
      }}
    >
      {link.label}
    </Button>
    {isActive && (
      <Box
        sx={{
          height: 3,
          width: "70%",
          bgcolor: ORANGE,
          borderRadius: 2,
          mt: 0.5,
        }}
      />
    )}
  </Box>
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
      transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        bgcolor: "#ffb03a",
        transform: "translateY(-1px)",
        "& .arrow-icon": { transform: "translateX(3px)" },
      },
      ...sx,
    }}
    endIcon={
      <ArrowForwardIcon
        className="arrow-icon"
        sx={{ transition: "transform 0.2s ease" }}
      />
    }
  >
    Get Quote
  </Button>
);

export default function NavBar() {
  const { open, toggle, close } = useNavController();
  const theme = useTheme();
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
        sx={{
          top: 0,
          background: {
            xs: "rgba(30,38,66,0.98)",
            md: "linear-gradient(90deg, rgba(30,38,66,0.98), rgba(30,38,66,0.92))",
          },
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 4, lg: 6 },
            maxWidth: "1440px",
            margin: "0 auto",
            width: "100%",
            minHeight: { xs: 63, md: 79 },
          }}
        >
          {/* LOGO + BRAND */}
          <Link
            to="/"
            aria-label={`${BRAND.name} — home`}
            style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
          >
            <Box className="flex items-center gap-3">
              <Box
                component="img"
                src={logoSrc}
                alt={`${BRAND.name} logo`}
                width={56}
                height={56}
                loading="eager"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
                sx={{
                  width: 56,
                  height: 56,
                  objectFit: "contain",
                  borderRadius: 2,
                  transition: "transform 0.25s ease",
                  "&:hover": { transform: "scale(1.05) rotate(4deg)" },
                }}
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

          {/* DESKTOP LINKS + CTA */}
          {!isMobile && (
            <>
              <Box
                component="nav"
                aria-label="Main"
                sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto", mr: 2 }}
              >
                {NAV_LINKS.map((n) => (
                  <NavButton key={n.id} link={n} isActive={activeLink === n.id} />
                ))}
              </Box>

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
            </>
          )}

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <Box sx={{ ml: "auto" }}>
              <IconButton
                onClick={toggle}
                sx={{
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                  "&:hover": { background: "rgba(255,255,255,0.1)", transform: "scale(1.05)" },
                }}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        id="mobile-nav"
        anchor="right"
        open={open && isMobile}
        onClose={close}
        transitionDuration={200}
        slotProps={{
          paper: {
            sx: {
              width: "86vw",
              maxWidth: 360,
              background: "linear-gradient(135deg, rgba(30,38,66,0.98), rgba(30,38,66,0.95))",
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
              width={36}
              height={36}
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
          {NAV_LINKS.map((n) => (
            <ListItem key={n.id} disablePadding>
              <ListItemButton
                component={Link}
                to={navTarget(n)}
                onClick={close}
                selected={activeLink === n.id}
                sx={{
                  py: 1.5,
                  px: 3,
                  transition: "background-color 0.2s ease",
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
