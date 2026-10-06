import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const reducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Controls scroll position on every navigation (renders nothing):
 *  - new page            → jump to the top instantly (never inherit the previous page's scroll)
 *  - link with a #hash   → scroll to that section (the sticky-navbar offset comes from
 *                          `scroll-padding-top` in index.css), also when coming from another page
 *  - same page, no hash  → smooth scroll to top (e.g. clicking the logo while on the home page)
 *
 * The browser's own scroll restoration is switched off so it can't fight this — otherwise
 * Back/Forward would drop you at a stale position before the page has rendered.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const pageChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    // "instant" explicitly overrides `scroll-behavior: smooth` from the stylesheet
    if (pageChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    if (!hash) {
      if (!pageChanged) {
        window.scrollTo({ top: 0, left: 0, behavior: reducedMotion() ? "instant" : "smooth" });
      }
      return;
    }

    // Wait for the target to exist (it may render a frame or two after the route changes)
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: pageChanged || reducedMotion() ? "instant" : "smooth",
          block: "start",
        });
      } else if (attempts++ < 30) {
        frame = requestAnimationFrame(scrollToTarget);
      }
    };
    frame = requestAnimationFrame(scrollToTarget);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
