import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently at the top of the viewport.
 * `ids` must be a stable array (define it at module level).
 */
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const navHeight =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 80;
      const line = navHeight + 40; // a section counts as "current" once its top passes this line

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Short last sections may never reach the line — at the very bottom, pick the last one
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = ids[ids.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);

  return active;
}
