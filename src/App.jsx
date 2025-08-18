import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import NavBar from "./views/layout/NavBar";
import Footer from "./views/layout/Footer";
import Section from "./views/layout/Section";

import Hero from "./views/sections/Hero";
import Services from "./views/sections/Services";
import About from "./views/sections/About";
import Gallery from "./views/sections/Gallery";
import Partners from "./views/sections/Partners";
import Contact from "./views/sections/Contact";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="min-h-screen w-screen">
        {/* Subtle top radial tint – no image */}
        <Box
          aria-hidden
          className="fixed inset-0 -z-10"
          sx={{
            background: `
              radial-gradient(1200px 600px at 15% 10%, rgba(247,163,26,0.12), transparent 60%),
              radial-gradient(1000px 500px at 85% 0%, rgba(255,255,255,0.06), transparent 50%)
            `,
          }}
        />

        <NavBar />

        <main>
          <Section id="hero">
            <Hero />
          </Section>

          <Section id="services">
            <Services />
          </Section>

          <Section id="about">
            <About />
          </Section>

          <Section id="gallery">
            <Gallery />
          </Section>

          <Section id="partners">
            <Partners />
          </Section>

          <Section id="contact">
            <Contact />
          </Section>
        </main>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
