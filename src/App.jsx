import { lazy, Suspense } from "react";
import { CssBaseline, Box, CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import theme, { ORANGE } from "./theme";

import NavBar from "./views/layout/NavBar";
import Footer from "./views/layout/Footer";
import Section from "./views/layout/Section";
import ScrollManager from "./views/layout/ScrollManager";
import ScrollToTopButton from "./views/layout/ScrollToTopButton";

import Hero from "./views/sections/Hero";
import Services from "./views/sections/Services";
import About from "./views/sections/About";
import Gallery from "./views/sections/Gallery";
import Partners from "./views/sections/Partners";
import Contact from "./views/sections/Contact";

// The portfolio page is big (lightbox, videos, ...) — load it only when someone visits it
const Portfolio = lazy(() => import("./views/pages/Portfolio"));

function PageLoader() {
  return (
    <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <CircularProgress sx={{ color: ORANGE }} aria-label="Loading page" />
    </Box>
  );
}

// Navbar + footer live here once, so they persist (and don't re-animate) between pages
function SiteLayout() {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: `
            radial-gradient(1200px 600px at 15% 10%, rgba(247,163,26,0.12), transparent 60%),
            radial-gradient(1000px 500px at 85% 0%, rgba(255,255,255,0.06), transparent 50%)
          `,
        }}
      />
      <NavBar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </Box>
  );
}

function HomePage() {
  return (
    <>
      <Section id="home"><Hero /></Section>
      <Section id="services"><Services /></Section>
      <Section id="about"><About /></Section>
      <Section id="gallery"><Gallery /></Section>
      <Section id="partners"><Partners /></Section>
      <Section id="contact"><Contact /></Section>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* Unknown URLs used to render a blank page — send them home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ScrollToTopButton />
    </ThemeProvider>
  );
}
