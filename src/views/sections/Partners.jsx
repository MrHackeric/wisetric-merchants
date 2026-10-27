import { Box, Typography } from "@mui/material";
import { PARTNERS } from "../../models/siteModel";

const GAP = { xs: 6, md: 10, lg: 14 };

export default function Partners() {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        overflowX: "hidden",
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

      {/* Marquee: Pure HTML/CSS Hardware-Accelerated Animation (0ms JS loop) */}
      <Box className="marquee-track">
        {[0, 1].map((loopIndex) => (
          <Box
            key={loopIndex}
            aria-hidden={loopIndex === 1 || undefined}
            sx={{ display: "flex", gap: GAP, pr: GAP }}
          >
            {PARTNERS.map((partner) => (
              <Box
                key={`${loopIndex}-${partner.company}`}
                sx={{
                  textAlign: "center",
                  flexShrink: 0,
                  transition: "transform 0.25s ease",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
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
                    filter: "grayscale(20%) contrast(90%)",
                    transition: "filter 0.3s ease",
                    "&:hover": { filter: "grayscale(0%) contrast(100%)" },
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
