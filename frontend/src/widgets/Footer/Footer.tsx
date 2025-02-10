import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <Box sx={{ mt: 4, width:"100%"}}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Button component={Link} to="/about-us" color="inherit">About us</Button>
            <Button component={Link} to="/contacts" color="inherit">Contacts</Button>
            <Button component={Link} to="/rights" color="inherit">Rights</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
