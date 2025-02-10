import "./App.css";

import { Outlet } from "react-router";

import { Header } from "./widgets/Header";
import { Footer } from "./widgets/Footer";
import { Notification } from "./widgets/Notiflication";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { whiteTheme } from "./themes/whiteTheme";

function App() {
  return (
    <ThemeProvider theme={whiteTheme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        className="App"
      >
        <Header />
        <Box component="main" sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }} className="App__content">
          <Outlet />
        </Box>
        <Footer />
        <Notification />
      </Box>
    </ThemeProvider>
  );
}

export default App;
