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
import projFourGif from "../assets/projects/wcus-fin.gif";
import projFiveGif from "../assets/projects/myis-fin.gif";

import projOneStill from "../assets/projects/kenwood-still.jpg";
import projTwoStill from "../assets/projects/JobSat-still.jpg";
import projThreeStill from "../assets/projects/the-guardian-still.jpg";
import projFourStill from "../assets/projects/wcus-still.png";
import projFiveStill from "../assets/projects/myis-still.png";

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
      "A responsive single-page React application for a local Baltimore establishment, featuring a modern design that highlights atmosphere, hours, and specials. Integrated Firebase for email list management, providing a cost-effective solution without subscription fees. Implemented Instagram API integration to dynamically display the latest social media content. Built with mobile-first design principles and optimized for local discovery and engagement.",
    still: projOneStill,
    gif: projOneGif,
  },
  {
    title: "Waterborne Commerce Reporting Tool",
    description:
      "An interactive data exploration platform for analyzing vessel trip, cargo, and tonnage data across U.S. waterways. Built with React and GraphQL, integrated with OracleDB to provide access to years of import and export records from ports, locks, and Corps of Engineers projects. Enables users to query, filter, and visualize complex maritime commerce data with intuitive interfaces and comprehensive reporting capabilities.",
    still: projFourStill,
    gif: projFourGif,
  },
  {
    title: "Multi-Year Investment Strategy Tool",
    description:
      "A strategic planning application that integrates a Python forecasting model with a React frontend to optimize project portfolio management. Intelligently ranks projects based on budget constraints and funding availability. Features an interactive interface allowing users to manually adjust project rankings and compare multiple funding scenarios. Generates detailed timelines visualizing project funding status, including fully funded, paused, awaiting funding, and unfunded states to support data-driven investment decisions.",
    still: projFiveStill,
    gif: projFiveGif,
  },
  {
    title: "Job Satisfaction Report",
    description:
      "An interactive data visualization dashboard for a Harvard University-led workplace well-being survey. Built with React frontend and Python FastAPI backend, integrated with PostgreSQL for data management. Developed Auth0 authentication flow and implemented end-to-end data pipeline processing thousands of survey responses. Created complex data aggregations and statistical calculations to power comprehensive visualizations. Delivers actionable insights to academic leadership on key drivers of employee satisfaction and institutional performance.",
    still: projTwoStill,
    gif: projTwoGif,
  },
  {
    title: "The Guardian Newsreader",
    description:
      "A news aggregation interface leveraging The Guardian's API to search and filter publications by date, edition, and topic. Built with React and Material UI, featuring intuitive navigation and responsive design. Demonstrates API integration, state management, and modern React development practices.",
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
    width: "48%",
    margin: theme.spacing(4),
    marginLeft: 0,
    marginRight: 0,
  },

  "& .project-image": {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
}));

export const Projects: React.FC = () => (
  <Container
    maxWidth="lg"
    sx={{ py: { xs: 6, md: 10 }, position: "relative", zIndex: 1 }}
  >
    <Typography
      id="projects-title"
      variant="h3"
      align="center"
      gutterBottom
      sx={{
        fontWeight: 700,
        mb: { xs: 4, md: 8 },
        backgroundColor: "#121212",
        display: "inline-block",
        px: 2,
      }}
      className="section-title"
    >
      Projects
    </Typography>

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

  // observer for mobile autoplay
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
        gap: { xs: 3, md: 8 },
        justifyContent: { xs: "center", md: "space-between" },
        marginBottom: { xs: 6, md: 8 },
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
          padding: { xs: 0, md: 3 },
          borderRadius: { xs: 0, md: 1 },
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: isHovered ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "text.primary",
          }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
            fontSize: "1rem",
          }}
        >
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
  const showGif = forceHover;

  return (
    <Box
      component="img"
      src={showGif ? gif : still}
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
