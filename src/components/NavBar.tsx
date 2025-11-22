import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";

const navLinks = [
  { label: "Projects", id: "projects" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

export const Navbar: React.FC<{ show: boolean }> = ({ show }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSmoothScrolling, setIsSmoothScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // don't update anything if we're in the middle of a smooth scroll from clicking
      if (isSmoothScrolling) {
        return;
      }

      // clear existing timeout
      clearTimeout(scrollTimeout);

      // set timeout to detect when scrolling has stopped
      scrollTimeout = setTimeout(() => {
      }, 150); // 150ms after scrolling stops

      const scrollPosition = window.scrollY + 200; // offset for navbar height

      // check if we're at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // find which section we're currently in
      let currentSection = "";

      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSection = link.id;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isSmoothScrolling]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsSmoothScrolling(true);
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = 64; // appBar default height
      const offsetPosition = section.offsetTop - navbarHeight - 20; // extra 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // reset smooth scrolling flag after animation completes
    // use longer timeout to ensure scroll events have settled
    setTimeout(() => {
      setIsSmoothScrolling(false);
    }, 1200);
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: "rgba(18, 18, 18, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: show ? "0 2px 12px rgba(0,0,0,0.4)" : "none",
        transform: show ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        zIndex: 1000,
        borderBottom: show ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
        {navLinks.map(({ label, id }) => {
          const isActive = activeSection === id;

          return (
            <Button
              key={label}
              onClick={() => scrollToSection(id)}
              disableRipple
              aria-label={`Navigate to ${label} section`}
              aria-current={isActive ? "page" : undefined}
              sx={{
                color: "text.primary",
                fontSize: "1rem",
                textTransform: "none",
                position: "relative",
                padding: "6px 16px",
                border: "none",
                borderBottom: isActive
                  ? "2px solid rgba(252, 211, 77, 0.9)"
                  : "2px solid transparent",
                borderRadius: 0,
                backgroundColor: "transparent",
                outline: "none !important",
                boxShadow: "none !important",
                "&:hover": {
                  color: "accent.main",
                  backgroundColor: "transparent",
                  borderBottom: "2px solid rgba(252, 211, 77, 0.8)",
                  outline: "none",
                  boxShadow: "none",
                },
                "&:focus": {
                  outline: "none !important",
                  boxShadow: "none !important",
                },
                "&:focus-visible": {
                  outline: "none !important",
                  boxShadow: "none !important",
                },
                "&:active": {
                  outline: "none !important",
                  boxShadow: "none !important",
                },
                "&.Mui-focusVisible": {
                  outline: "none !important",
                  boxShadow: "none !important",
                },
              }}
            >
              {label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};
