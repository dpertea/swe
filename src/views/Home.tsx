import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Intro } from "../components/Intro";
import headshot from "../assets/headshot.jpg";

export const Home: React.FC = () => {
  const [isProjectsTitleVisible, setIsProjectsTitleVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Track when initial animation completes
    const animationTimer = setTimeout(() => {
      setHasAnimated(true);
    }, 3000); // 2.2s delay + 0.8s duration

    // Intersection Observer to check if Projects title is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when Projects title is NOT visible
        setIsProjectsTitleVisible(entry.isIntersecting);
      },
      {
        threshold: 0, // Trigger as soon as any part is visible
      }
    );

    const projectsTitle = document.getElementById("projects-title");
    if (projectsTitle) {
      observer.observe(projectsTitle);
    }

    return () => {
      clearTimeout(animationTimer);
      if (projectsTitle) {
        observer.unobserve(projectsTitle);
      }
    };
  }, []);

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* First row: headshot and intro text - horizontally centered */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              width: "100%",
              maxWidth: "fit-content",
              mx: "auto",
            }}
          >
            {/* headshot */}
            <Box
              sx={{
                position: "relative",
                width: { xs: 180, sm: 200, md: 240 },
                height: { xs: 180, sm: 200, md: 240 },
                borderRadius: "50%",
                overflow: "visible",
                flexShrink: 0,
                animation: "fadeInLeft 1s ease-out 1s forwards",
                opacity: 0,
                transform: "translateX(-200px)",
                "@keyframes fadeInLeft": {
                  to: {
                    opacity: 1,
                    transform: "translateX(0px)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "rgba(0,0,0, 0.5)",
                  filter: "blur(15px)",
                  zIndex: -1,
                },
              }}
            >
              <Box
                component="img"
                src={headshot}
                alt="Doria Pertea"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 0 24px rgba(0,0,0, 0.4)",
                  display: "block",
                }}
              />
            </Box>

            {/* intro text */}
            <Intro />
          </Box>
        </Box>

        {/* See My Work button - at bottom of intro section */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 24, sm: 32 },
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: hasAnimated && !isProjectsTitleVisible ? 1 : 0,
            animation: hasAnimated ? "none" : "fadeIn 0.8s ease-out 2.2s forwards",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
            zIndex: 10,
            width: "100%",
            px: 2,
            transition: hasAnimated ? "opacity 0.3s ease" : "none",
            pointerEvents: hasAnimated && !isProjectsTitleVisible ? "auto" : "none",
          }}
        >
          <Button
            component="a"
            onClick={scrollToProjects}
            sx={{
              color: "accent.main",
              fontSize: "0.875rem",
              fontWeight: 400,
              textTransform: "none",
              padding: "8px 16px",
              minWidth: "auto",
              width: "100%",
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(252, 211, 77, 0.15)",
                color: "accent.main",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            See My Work
            <ArrowDownwardIcon sx={{ fontSize: "1rem" }} />
          </Button>
        </Box>
      </Box>
      {/*showResume && <Resume />*/}
    </>
  );
};
