import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router";

export const Header = () => {
  const [auth, setAuth] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to="/" color="inherit">
              Quests
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", gap: 4 }}>
            <Button component={Link} to="/create" color="inherit">
              Create
            </Button>
            <Button component={Link} to="/rating" color="inherit">
              Rating
            </Button>
          </Box>

          {auth ? (
            <div>
              <IconButton
                component={Link}
                to="/profile"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <>
              <Button component={Link} to="/sing-in" color="inherit">
                Sign in
              </Button>
              <Button component={Link} to="/sing-up" color="inherit">
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
