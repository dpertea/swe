import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import emailjs from "@emailjs/browser";
import { keyframes } from "@mui/system";
import "../App.css";

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    success: true,
    message: "",
  });

  // Initialize EmailJS with your public key
  useEffect(() => {
    const publicKey =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key_xxxxxxx";
    if (publicKey && publicKey !== "your_public_key_xxxxxxx") {
      emailjs.init(publicKey);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xxxxxxx",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_xxxxxxx",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        }
        // Public key is now initialized via emailjs.init() in useEffect
      );

      setSnackbar({
        open: true,
        success: true,
        message: "Message sent successfully!",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setSnackbar({
        open: true,
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  const dropDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 8,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Typography
        className="section-title"
        variant="h3"
        component="h2"
        sx={{
          mb: 4,
          backgroundColor: "#121212",
          display: "inline-block",
          px: 2,
        }}
      >
        Contact
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 4,
          backgroundColor: "#121212",
          display: "inline-block",
          px: 2,
        }}
      >
        I look forward to hearing from you.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          animation: `${dropDown} 0.8s ease-out`,
          backgroundColor: "#1e1e1e",
          padding: 2,
          borderRadius: 1,
        }}
      >
        {["name", "email", "message"].map((field) => (
          <TextField
            key={field}
            fullWidth
            margin="normal"
            label={
              field === "name"
                ? "Your Name"
                : field === "email"
                ? "Your Email"
                : "Your Message"
            }
            name={field}
            type={field === "email" ? "email" : "text"}
            multiline={field === "message"}
            rows={field === "message" ? 4 : undefined}
            required
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            sx={{
              "& label.Mui-focused": { color: "accent.main" },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "accent.main" },
                "&.Mui-focused fieldset": { borderColor: "accent.main" },
              },
            }}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            backgroundColor: "accent.main",
            color: "#000",
            "&:hover": {
              backgroundColor: "accent.dark",
            },
          }}
        >
          Send Message
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.success ? "success" : "error"}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
