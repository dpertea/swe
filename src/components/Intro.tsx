import React from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextDecryptEffect from "./TextDecryptEffect";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const buildValues = ["Workflows", "Automations", "Experiences", "Tools"];

const AnimatedContainer = styled(Container)(() => ({
  animation: "slideInLeft 0.8s ease-out forwards",
  opacity: 0,
  textAlign: "center", // default for mobile
  position: "relative",
  zIndex: 1,

  "@media (min-width:600px)": {
    textAlign: "left", // switch to left-aligned on sm+
  },
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
  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <AnimatedContainer maxWidth="sm">
      <Typography
        variant="h2"
        component="h1"
        sx={{
          backgroundColor: "#121212",
          display: "inline-block",
          px: 1,
          mb: 2,
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        Hi, I'm{" "}
        <Box component="span" color="accent.main">
          Doria
        </Box>
      </Typography>
      <br />
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
          backgroundColor: "#121212",
          display: "inline-block",
          px: 1,
          mb: 1,
          fontWeight: 400,
          fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
        }}
      >
        I build
      </Typography>
      <br />
      <Box
        sx={{
          opacity: 0,
          animation: "fadeIn 0.8s ease-out 0.8s forwards",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          backgroundColor: "#121212",
          display: "inline-block",
          px: 1,
          mb: 3,
        }}
      >
        <Typography variant="h5" component="span">
          <TextDecryptEffect textValues={buildValues} />
        </Typography>
      </Box>
      <br />
      {/*href="/DoriaPerteaResume.pdf"*/}
      <Button
        component="a"
        variant="outlined"
        endIcon={<ArrowDownwardIcon />}
        sx={{
          mt: 4,
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
          opacity: 0,
          animation: "fadeIn 0.8s ease-out 1.6s forwards",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          backgroundColor: "#121212",
          borderColor: "accent.main",
          color: "accent.main",
          "&:hover": {
            backgroundColor: "rgba(252, 211, 77, 0.15)",
            borderColor: "accent.main",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(252, 211, 77, 0.2)",
          },
          transition: "all 0.3s ease",
        }}
        onClick={scrollToProjects}
      >
        See My Work
      </Button>
    </AnimatedContainer>
  );
};
