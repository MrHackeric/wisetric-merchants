import { Box, Typography } from "@mui/material";

/**
 * Anchor wrapper for a page section — owns the `id` used by nav links and scroll-spy.
 * Lightweight, hardware-accelerated rendering without JS animation libraries.
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
            sx={{
              fontWeight: 900,
              lineHeight: 1.2,
              animation: "fadeInUp 0.5s ease-out forwards",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                color: "#cbd5e1",
                mt: 1.5,
                animation: "fadeInUp 0.5s ease-out 0.1s forwards",
              }}
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
