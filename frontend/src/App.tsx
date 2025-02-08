import "./App.css";

import { Outlet } from "react-router";

import { Header } from "./widgets/Header";
import { Footer } from "./widgets/Footer";
import { Notification } from "./widgets/Notiflication";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="App__content">
        <Outlet />
      </main>

      <Notification />

      <Footer />
    </div>
  );
}

export default App;
