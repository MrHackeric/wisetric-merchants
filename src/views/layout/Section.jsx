import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Anchor wrapper for a page section — owns the `id` used by nav links and scroll-spy.
 * Sections that bring their own heading/background (Hero, Services, ...) are rendered as-is;
 * pass `title` (and optionally `subtitle`) to get a standard padded heading.
 */
export default function Section({ id, title, subtitle, children }) {
  if (!title) {
    return (
      <Box component="section" id={id} sx={{ width: "100%" }}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      component="section"
      id={id}
      sx={{ width: "100%", py: { xs: 8, md: 10 } }}
    >
      <Box sx={{ px: { xs: 2, md: 5, xl: 8 } }}>
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="h3"
            component={motion.h3}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            sx={{ fontWeight: 900, lineHeight: 1.2 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              sx={{ color: "#cbd5e1", mt: 1.5 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {children}
      </Box>
    </Box>
  );
}
