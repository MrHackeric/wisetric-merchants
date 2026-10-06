import { Box, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { PARTNERS } from "../../models/siteModel";

const GAP = { xs: 6, md: 10, lg: 14 };

export default function Partners() {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        // with reduced motion the logos don't scroll by themselves, so let people swipe through them
        overflowX: reduceMotion ? "auto" : "hidden",
        position: "relative",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#f1f5f9",
          mb: 8,
          px: { xs: 2, md: 5 },
          textTransform: "uppercase",
          letterSpacing: 3,
        }}
      >
        Our Partners
      </Typography>

      {/* Marquee: two identical groups side by side, slide left by exactly one group's width.
          Each group carries its own trailing gap (padding-right) so the loop point is seamless. */}
      <Box
        sx={{ display: "flex", width: "max-content" }}
        component={motion.div}
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {[0, 1].map((loopIndex) => (
          <Box
            key={loopIndex}
            // the second copy is only there for the loop — hide it from screen readers
            aria-hidden={loopIndex === 1 || undefined}
            sx={{ display: "flex", gap: GAP, pr: GAP }}
          >
            {PARTNERS.map((partner) => (
              <Box
                key={`${loopIndex}-${partner.company}`}
                sx={{ textAlign: "center", flexShrink: 0 }}
              >
                {/* Partner Logo */}
                <Box
                  component="img"
                  src={partner.image}
                  alt={loopIndex === 0 ? partner.company : ""}
                  loading="lazy"
                  sx={{
                    height: { xs: 70, sm: 90, md: 110 },
                    width: "auto",
                    mx: "auto",
                    borderRadius: 2,
                  }}
                />

                {/* Partner Name */}
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, fontWeight: 600, color: "#cbd5e1" }}
                >
                  {partner.company}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
