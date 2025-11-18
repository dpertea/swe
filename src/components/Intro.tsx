import React from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextDecryptEffect from "./TextDecryptEffect";
import { useTheme } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const buildValues = ["Workflows", "Experiences", "Automations", "Tools"];

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
  const theme = useTheme();

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <AnimatedContainer maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Hi, I'm{" "}
        <Box component="span" color="accent.main">
          Doria
        </Box>
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          opacity: 0,
          animation: "fadeIn 0.8s ease-out 0.8s forwards",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        and I like to build
        <br /> <TextDecryptEffect textValues={buildValues} />
      </Typography>
      {/*href="/DoriaPerteaResume.pdf"*/}
      <Button
        component="a"
        variant="outlined"
        color="accent.main"
        endIcon={<ArrowDownwardIcon />}
        sx={{
          mt: 3,
          opacity: 0,
          animation: "fadeIn 0.8s ease-out 1.6s forwards",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          "&:hover": {
            backgroundColor: "accent.dark",
          },
          backgroundColor: "#121212",
          outline: "accent.main",
          color: "accent.main",
        }}
        onClick={scrollToProjects}
      >
        See My Work
      </Button>
    </AnimatedContainer>
  );
};
