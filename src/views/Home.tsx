import React from "react";
import { Box, Button } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Intro } from "../components/Intro";
import headshot from "../assets/headshot.jpg";

export const Home: React.FC = () => {
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
          {/* Container box to group all intro elements */}
          <Box
            sx={{
              backgroundColor: "rgba(30, 30, 30, 0.4)",
              backdropFilter: "blur(10px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              padding: { xs: 3, sm: 4, md: 5 },
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 3, sm: 2.5 },
              width: "100%",
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

          {/* See My Work button - outside the box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: { xs: 3, sm: 2.5 },
              opacity: 0,
              animation: "fadeIn 0.8s ease-out 1.6s forwards",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Button
              component="a"
              variant="outlined"
              endIcon={<ArrowDownwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
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
          </Box>
        </Box>
      </Box>
      {/*showResume && <Resume />*/}
    </>
  );
};
