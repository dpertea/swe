import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import projOneGif from "../assets/projects/kenwood.gif";
import projTwoGif from "../assets/projects/JobSat-SHORT.gif";
import projThreeGif from "../assets/projects/the-guardian.gif";

import projOneStill from "../assets/projects/kenwood-still.jpg";
import projTwoStill from "../assets/projects/JobSat-still.jpg";
import projThreeStill from "../assets/projects/the-guardian-still.jpg";
import "../App.css";

interface Project {
  title: string;
  description: string;
  still: string;
  gif: string;
}

const projects: Project[] = [
  {
    title: "Kenwood Tavern",
    description:
      "A simple, responsive, single-page React landing page for a local Baltimore bar, built to highlight their atmosphere, hours, and specials. To help them grow a mailing list without ongoing costs, I integrated Firebase to handle email sign-ups and give them a lightweight, self-managed solution with zero subscription fees. Additionally I implemented a feature to directly interact with instagram's api, in order to fetch and display the latest photos posted to their instagram account. The design is simple, mobile-friendly, and optimized for local discovery.",
    still: projOneStill,
    gif: projOneGif,
  },
  {
    title: "Job Satisfaction Report",
    description:
      "An interactive web dashboard for a Harvard University-led survey on workplace well-being developed in React with a Python FastAPI and PostgreSQL database. I developed the Auth0 authentication flow and participated in the full data pipeline to help clean and aggregate responses from thousands of employee surveys into our postgreSQL database and then performed complex queries and calculations in Python for integration with our frontend React App and its many data visualizations. The resulting site gives chief acedemic officers of institutions clear insights into key drivers of satisfaction and turns complex survey data into actionable recommendations for institutions.",
    still: projTwoStill,
    gif: projTwoGif,
  },
  {
    title: "The Guardian Newsreader",
    description:
      "A simple interface to interact with The Guardian's news API and easily search and access publications by date, edition, tag, and more. Built with React and Material UI, this was my first ever attempt at building a React App before discovering my passion for full stack development.",
    still: projThreeStill,
    gif: projThreeGif,
  },
];

// wrapper that handles hovers
const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",

  // base: full width, centered
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",

  // from medium screens up:
  [theme.breakpoints.up("md")]: {
    width: "45%",
    margin: theme.spacing(5),
    marginLeft: 0,
    marginRight: 0,
  },

  "& .project-image": {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  "& .project-image:hover": {
    transform: "scale(1.05)",
    boxShadow: "1px 1px 10px 2px #646cff",
  },
  "& .project-image:hover + .accent": {
    transform: "translate(0, 0) rotate(0deg) scale(1.15)",
    width: "100%",
    height: "100%",
  },
}));

export const Projects: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
    <Typography
      variant="h3"
      align="center"
      gutterBottom
      sx={{ fontWeight: 700, mb: 6 }}
      className="section-title"
    >
      Projects
    </Typography>
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: "italic" }}
      >
        <span style={{ color: "#fcd34d" }}>*** </span>This site is actively
        under construction. More project samples coming soon…
        <span style={{ color: "#fcd34d" }}>*** </span>
      </Typography>
    </Box>

    {projects.map((proj, idx) => {
      const isReversed = idx % 2 === 1;

      return (
        <ProjectRow key={proj.title} project={proj} isReversed={isReversed} />
      );
    })}
  </Container>
);

// Project row component that manages shared hover state
const ProjectRow: React.FC<{ project: Project; isReversed: boolean }> = ({
  project,
  isReversed,
}) => {
  const [imageHovered, setImageHovered] = useState(false);
  const [descriptionHovered, setDescriptionHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isHovered = imageHovered || descriptionHovered;

  // Intersection Observer for mobile autoplay
  useEffect(() => {
    if (!isMobile || !imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the image is visible
    );

    observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: isReversed ? "row-reverse" : "row",
        },
        alignItems: "center",
        gap: { xs: 2, md: 12 },
        justifyContent: { xs: "center", md: "space-between" },
        marginBottom: 4,
        maxWidth: { xs: 600, md: "100%" },
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: { xs: "#1e1e1e", md: "transparent" },
        padding: { xs: 2, md: 0 },
        borderRadius: { xs: 1, md: 0 },
      }}
    >
      <ImageWrapper
        ref={imageRef}
        sx={{
          width: "100%",
        }}
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        {/* project image/GIF */}
        <HoverSwapImage
          still={project.still}
          gif={project.gif}
          forceHover={isMobile ? isInView : isHovered}
        />

        {/* geometric accent - hide on mobile */}
        <Box
          className="accent"
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 0,
            left: 0,
            width: isHovered ? "100%" : 180,
            height: isHovered ? "100%" : 180,
            backgroundColor: "#fcd34d",
            transform: isHovered
              ? "translate(0, 0) rotate(0deg) scale(1.15)"
              : "translate(-40px, -40px) rotate(45deg) scale(1)",
            transformOrigin: "center",
            transition:
              "transform 0.5s ease, width 0.5s ease, height 0.5s ease",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      </ImageWrapper>

      <Box
        onMouseEnter={() => setDescriptionHovered(true)}
        onMouseLeave={() => setDescriptionHovered(false)}
        sx={{
          width: "100%",
          backgroundColor: { xs: "transparent", md: "#1e1e1e" },
          padding: { xs: 0, md: 2 },
          borderRadius: { xs: 0, md: 1 },
          cursor: "pointer",
          transition: "transform 0.3s ease",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          {project.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {project.description}
        </Typography>
      </Box>
    </Box>
  );
};

// helper to swap between still & gif on hover
const HoverSwapImage: React.FC<{
  still: string;
  gif: string;
  forceHover?: boolean;
}> = ({ still, gif, forceHover = false }) => {
  const [hover, setHover] = useState(false);
  const showGif = hover || forceHover;

  return (
    <Box
      component="img"
      src={showGif ? gif : still}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      alt="Project preview"
      className="project-image"
      sx={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: "auto",
        display: "block",
        transform: showGif ? "scale(1.05)" : "scale(1)",
        boxShadow: showGif ? "1px 1px 10px 2px #646cff" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    />
  );
};
