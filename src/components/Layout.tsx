import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FooterIcons } from "./footer/FooterIcons";
import { Navbar } from "./NavBar"; // optional, if you have one
import { Box } from "@mui/material";
import Fireflies from "./background/Fireflies";

export const Layout: React.FC = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      minWidth="100vw"
    >
      {/*<div
        id="custom-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "1px",
          height: "1px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0)",
          boxShadow: "0 0 5vw 1vw #fcd34d",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.05s linear",
        }}
      />*/}
      <Navbar /> {/* optional */}
      <Fireflies />
      <Box
        component="main"
        sx={{ flex: 1, display: "flex", position: "relative", zIndex: 1 }}
      >
        <Outlet />
      </Box>
      <FooterIcons />
    </Box>
  );
};
