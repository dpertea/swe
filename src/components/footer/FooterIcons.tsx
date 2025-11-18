import React from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export const FooterIcons: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ padding: "2rem 1rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
      <Tooltip title="LinkedIn">
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/doria-pertea-20333220b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "accent.main",
            },
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
            color: "text.secondary",
            "&:hover": {
              color: "accent.main",
            },
          }}
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      </Stack>
      
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
        © {currentYear} Doria Pertea. All rights reserved.
      </Typography>
    </Stack>
  );
};
