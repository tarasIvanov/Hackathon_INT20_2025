import "./App.css";

import { Outlet } from "react-router";

import { Header } from "./widgets/Header";
import { Footer } from "./widgets/Footer";
import { Notification } from "./widgets/Notiflication";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { whiteTheme } from "./themes/whiteTheme";

function App() {
  return (
    <ThemeProvider theme={whiteTheme}>
      <CssBaseline />
      <div className="App">
        <Header />

        <main className="App__content">
          <Outlet/>
        </main>
        
        <Footer />

        <Notification />
      </div>
    </ThemeProvider>
  );
}

export default App;
