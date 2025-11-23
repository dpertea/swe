import React from "react";
import { Typography, Container, Box, IconButton, Stack, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextDecryptEffect from "./TextDecryptEffect";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const buildValues = ["Workflows", "Automations", "Experiences", "Tools"];

const AnimatedContainer = styled(Container)(() => ({
  animation: "slideInLeft 0.8s ease-out forwards",
  opacity: 0,
  textAlign: "center",
  position: "relative",
  zIndex: 1,
  "@keyframes slideInLeft": {
    from: {
      transform: "translateX(500px)",
      opacity: 0,
    },
    to: {
      transform: "translateX(0)",
      opacity: 1,
    },
  },
}));

export const Intro: React.FC = () => {
  return (
    <AnimatedContainer maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Hi, I'm{" "}
          <Box component="span" color="accent.main">
            Doria
          </Box>
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              opacity: 0,
              animation: "fadeIn 0.8s ease-out 0.8s forwards",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
              mb: 0.5,
              fontWeight: 400,
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              textAlign: { xs: "center", sm: "left" },
              lineHeight: 1.4,
              width: "100%",
            }}
          >
            I build
          </Typography>

          <Box
            sx={{
              opacity: 0,
              animation: "fadeIn 0.8s ease-out 0.8s forwards",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
              mb: 2,
              textAlign: { xs: "center", sm: "left" },
              width: "100%",
            }}
          >
            <Typography 
              variant="h5" 
              component="span" 
              sx={{ lineHeight: 1.4 }}
              aria-live="polite"
              aria-atomic="true"
            >
              <TextDecryptEffect textValues={buildValues} />
            </Typography>
          </Box>

          <Box
            sx={{
              opacity: 0,
              animation: "fadeIn 0.8s ease-out 0.8s forwards",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
          <Stack 
            direction="row" 
            spacing={1.5}
            sx={{
              marginLeft: { xs: 0, sm: "-8px" }, // Negative margin to align with text
            }}
          >
            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/doria-pertea-20333220b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{
                  color: "#fff",
                  fontSize: "2.25rem",
                  padding: { xs: 1, sm: 0.5 }, // Reduced padding on larger screens
                  "& svg": {
                    fontSize: "2.25rem",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(252, 211, 77, 0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(252, 211, 77, 0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/dpertea"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{
                  color: "#fff",
                  fontSize: "2.25rem",
                  padding: { xs: 1, sm: 0.5 }, // Reduced padding on larger screens
                  "& svg": {
                    fontSize: "2.25rem",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(252, 211, 77, 0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(252, 211, 77, 0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          </Box>
        </Box>
      </Box>
    </AnimatedContainer>
  );
};
