import "./App.css";

import { Outlet } from "react-router";

import { Header } from "./widgets/Header";
import { Footer } from "./widgets/Footer";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { whiteTheme } from "./themes/whiteTheme";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <ThemeProvider theme={whiteTheme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        className="App"
      >
        <Header/>
        <Box
          component="main"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          className="App__content"
        >
          <Outlet/>
        </Box>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
