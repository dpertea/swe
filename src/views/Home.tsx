import React from "react";
import { Grid, Box } from "@mui/material";
import { Intro } from "../components/Intro";
import headshot from "../assets/headshot.jpg";

export const Home: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {/* headshot comes first, and now slides in from the left */}
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 120, sm: 180, md: 240 },
                  height: { xs: 120, sm: 180, md: 240 },
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
                    background: "rgba(0,0,0, 0.5)", // adjust to match your theme's accent.main
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
                    boxShadow: "0 0 24px rgba(0,0,0, 0.4)", // outer drop shadow
                    display: "block",
                  }}
                />
              </Box>

              <Intro />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/*showResume && <Resume />*/}
    </>
  );
};
