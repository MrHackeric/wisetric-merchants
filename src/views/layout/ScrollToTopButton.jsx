import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ORANGE, NAVY } from "../../theme";

const SHOW_AFTER_PX = 400;

/** Floating "back to top" button — appears once the visitor has scrolled down a bit. */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <Zoom in={visible} unmountOnExit>
      <Fab
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        size="medium"
        sx={{
          position: "fixed",
          // keep clear of the iPhone home indicator / Android gesture bar
          right: { xs: 16, md: 28 },
          bottom: { xs: "calc(16px + env(safe-area-inset-bottom))", md: 28 },
          zIndex: 1100, // above content and navbar shadow, below modals (1300+) and the lightbox
          bgcolor: ORANGE,
          color: NAVY,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.12)",
          "&:hover": { bgcolor: "#ffb03a", transform: "translateY(-2px)" },
          transition: "transform 0.2s ease, background-color 0.2s ease",
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
