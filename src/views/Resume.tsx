import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Box,
  Container,
  Button,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import "../App.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export const Resume: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setPageWidth(Math.min(width, 850)); // limit max width
      }
    };

    // Call once on mount
    resize();

    // Listen with ResizeObserver for more reliable container tracking
    const observer = new ResizeObserver(resize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Container maxWidth="md" sx={{ my: 0 }}>
      <Box
        ref={containerRef}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        sx={{
          mb: 3,
          /*opacity: 0,
          animation: "slideDown 1s ease-out forwards",
          "@keyframes slideDown": {
            from: {
              transform: "translateY(-100px)",
              opacity: 0,
            },
            to: {
              transform: "translateY(0)",
              opacity: 1,
            },
          },*/
        }}
      >
        <Typography className="section-title" variant="h3" component="h2">
          Resume
        </Typography>
        <Button
          component="a"
          href="/DoriaPerteaResume.pdf"
          download
          variant="text"
          endIcon={<DownloadIcon />}
          sx={{
            mt: 3,

            "&:hover": {
              backgroundColor: "accent.dark",
            },
            color: "accent.main",
          }}
        >
          Download My Resume
        </Button>
        <Document
          file={`${window.location.origin}/DoriaPerteaResume.pdf`}
          onLoadSuccess={handleDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={pageWidth}
          />
        </Document>

        {numPages && numPages > 1 && (
          <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
            <Pagination
              count={numPages}
              page={pageNumber}
              onChange={(_, val) => setPageNumber(val)}
              color="primary"
            />
          </Stack>
        )}
      </Box>
    </Container>
  );
};
