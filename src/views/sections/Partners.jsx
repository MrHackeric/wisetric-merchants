import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { PARTNERS } from "../../models/siteModel";

export default function Partners() {
  return (
    <Box
      className="px-4 md:px-10 xl:px-16 py-20"
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#f1f5f9",
          mb: 8,
          textTransform: "uppercase",
          letterSpacing: 3,
        }}
      >
        Our Partners
      </Typography>

      {/* Marquee Wrapper */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 6, md: 10, lg: 14 },
          width: "max-content",
        }}
        component={motion.div}
        animate={{ x: ["-50%", "0%"] }} // move left to right
        transition={{
          repeat: Infinity,
          duration: 60, // slow speed
          ease: "linear",
        }}
      >
        {/* Duplicate the list twice for seamless loop */}
        {[...Array(2)].map((_, loopIndex) => (
          <Box
            key={loopIndex}
            sx={{ display: "flex", gap: { xs: 6, md: 10, lg: 14 } }}
          >
            {PARTNERS.map((partner, i) => (
              <Box
                key={`${loopIndex}-${i}`}
                sx={{
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {/* Partner Logo */}
                <Box
                  component="img"
                  src={partner.image}
                  alt={partner.company}
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
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    color: "#cbd5e1",
                  }}
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
