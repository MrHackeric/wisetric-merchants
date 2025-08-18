import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Section({ id, title, subtitle, children }) {
  return (
    <Box id={id} className="py-16 md:py-20 w-screen">
      <Box className="px-4 md:px-10 xl:px-16">
        <Box className="mb-8 md:mb-10">
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
