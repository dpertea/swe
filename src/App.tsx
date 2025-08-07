import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import { darkTheme } from "./theme";
//import { Navbar } from "./components/NavBar";

//background
import Fireflies from "./components/background/Fireflies";

import { Home } from "./views/Home";
import { Contact } from "./views/Contact";
import { Resume } from "./views/Resume";
import { Projects } from "./views/Projects";

const AppContent = () => {
  //const theme = React.useContext(ThemeContext);
  //const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    /*const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.8); // past the home section
    };
    /*window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);*/
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/*<Navbar show={showNav} />*/}

      <Box
        sx={{
          overflowY: "auto",

          height: "100%",
          width: "100%",
        }}
      >
        <section id="home" style={{ height: "100vh", width: "100%" }}>
          <Home />
        </section>
        <section id="projects" style={{ height: "100%" }}>
          <Projects />
        </section>
        <section id="resume" style={{ height: "100%" }}>
          <Resume />
        </section>
        <section id="contact" style={{ height: "100%" }}>
          <Contact />
        </section>
      </Box>
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeContextProvider>
    <AppContent />
  </ThemeContextProvider>
);

export default App;
