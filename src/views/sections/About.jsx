import { Grid, Box, Typography, Stack, Chip, useMediaQuery, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import { ABOUT_BULLETS, BRAND } from "../../models/siteModel";
import { ORANGE, NAVY } from "../../theme";

const ABOUT_IMAGES = {
  team: "/images/team.jpg",
  mission: "/images/logo-sm.jpg",
};

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sections = [
    {
      icon: <GroupsIcon sx={{ fontSize: 36, color: ORANGE }} />,
      title: "About Us",
      content:
        "We're a Nairobi-based electrical firm delivering safe, beautiful solutions across residential, commercial, and creative industries.",
    },
    {
      icon: <FlagIcon sx={{ fontSize: 36, color: ORANGE }} />,
      title: "Our Mission",
      content:
        "To power Kenya's growth through innovative electrical solutions that combine engineering excellence with artistic craftsmanship.",
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 36, color: ORANGE }} />,
      title: "Our Vision",
      content:
        "To be East Africa's most trusted electrical partner for projects requiring both technical precision and creative vision.",
    },
    {
      icon: <StarIcon sx={{ fontSize: 36, color: ORANGE }} />,
      title: "Our Values",
      content:
        "Safety first, client focus, innovation, integrity, and craftsmanship in every project we undertake.",
    },
  ];

  return (
    <Box
      sx={{
        overflowX: "clip",
        py: { xs: 6, md: 10 },
        px: { xs: 3, sm: 5, md: 8 },
        background: `linear-gradient(135deg, ${NAVY} 0%, #0f172a 100%)`,
      }}
    >
      <Box sx={{ maxWidth: 1440, mx: "auto" }}>
        {/* Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 6,
            textAlign: "center",
            color: "white",
            fontSize: { xs: "2.2rem", md: "3rem" },
            "& span": { color: ORANGE },
          }}
        >
          About <span>{BRAND.name}</span>
        </Typography>

        {/* Content Grid */}
        <Grid container spacing={isMobile ? 4 : 6}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={isMobile ? 3 : 4}>
              {sections.map((section, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 3,
                    alignItems: "flex-start",
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease",
                    "&:hover": {
                      transform: "translateX(6px)",
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(247,163,26,0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 68,
                      height: 68,
                      bgcolor: "rgba(247,163,26,0.12)",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${ORANGE}30`,
                      flexShrink: 0,
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, color: "white", mb: 0.8 }}
                    >
                      {section.title}
                    </Typography>
                    <Typography sx={{ color: "#cbd5e1", lineHeight: 1.6 }}>
                      {section.content}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              {/* Team Photo */}
              <Box
                sx={{
                  height: 300,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${ABOUT_IMAGES.team})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    p: 4,
                    background: `linear-gradient(to top, ${NAVY}ee, transparent)`,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "white" }}
                  >
                    Our Team in Action
                  </Typography>
                </Box>
              </Box>

              {/* Why Choose Us */}
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderRadius: 3,
                  p: 4,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: ORANGE, mb: 3 }}
                >
                  Why Choose Us
                </Typography>
                <Stack spacing={2}>
                  {ABOUT_BULLETS.map((bullet, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                    >
                      <CheckCircleIcon sx={{ color: ORANGE, mt: "2px", fontSize: 20 }} />
                      <Typography sx={{ color: "#e2e8f0", lineHeight: 1.6 }}>
                        {bullet}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Contact Chips */}
        <Box
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Chip
            icon={<LocationOnIcon />}
            label="Karen Village, Nairobi"
            sx={{
              bgcolor: "rgba(247,163,26,0.15)",
              color: ORANGE,
              border: `1px solid ${ORANGE}55`,
              "& .MuiChip-icon": { color: ORANGE },
            }}
          />
          <Chip
            icon={<LocalPhoneIcon />}
            label={BRAND.phone}
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              "& .MuiChip-icon": { color: ORANGE },
            }}
          />
          <Chip
            icon={<EmailIcon />}
            label={BRAND.email}
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              "& .MuiChip-icon": { color: ORANGE },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
