import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Box,
  Container,
  Button,
  Pagination,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import "../App.css";

// Polyfill for URL.parse (not available in older browsers)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(URL as any).parse) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (URL as any).parse = function (url: string, base?: string | URL) {
    try {
      return new URL(url, base);
    } catch {
      return null;
    }
  };
}

// Polyfill for Promise.withResolvers (not available in older browsers)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(Promise as any).withResolvers) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Promise as any).withResolvers = function <T>() {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason?: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve: resolve!, reject: reject! };
  };
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const Resume: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError(
      "Unable to load PDF viewer. Please update your browser or download the PDF instead."
    );
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
        <Typography
          className="section-title"
          variant="h3"
          component="h2"
          sx={{
            mb: 3,
            backgroundColor: "#121212",
            display: "inline-block",
            px: 2,
          }}
        >
          Resume
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 3,
            mb: 1.5,
            px: 2,
          }}
        >
          <Button
            component="a"
            href={`${import.meta.env.BASE_URL}/DoriaPerteaResume.pdf`}
            download
            aria-label="Download resume PDF"
            endIcon={<DownloadIcon />}
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
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
                backgroundColor: "rgba(252, 211, 77, 0.15)",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            Download Resume
          </Button>
        </Box>
        {error ? (
          <Alert
            severity="info"
            sx={{
              mt: 2,
              mb: 4,
              backgroundColor: "rgba(252, 211, 77, 0.1)",
              color: "#fcd34d",
              borderColor: "#fcd34d",
              "& .MuiAlert-icon": {
                color: "#fcd34d",
              },
            }}
          >
            {error}
          </Alert>
        ) : (
          <Document
            file={`${window.location.origin}${
              import.meta.env.BASE_URL
            }/DoriaPerteaResume.pdf`}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
            loading={<Typography sx={{ py: 4 }}>Loading PDF...</Typography>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={pageWidth}
            />
          </Document>
        )}

        {numPages && numPages > 1 && !error && (
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
