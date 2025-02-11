import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { userGet } from "../../api/User/userGet";
import { Avatar } from "@mui/material";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { User } from "@/Types/User";
import { AccountCircle } from "@mui/icons-material";

export const Header = () => {
  const [user, setUser] = useState<User>();
  const avatar = useRef<string | undefined>(undefined);
  const token = useRef(localStorage.getItem("access_token"));

  useEffect(() => {
    if (token.current) {
      userGet(token.current).then((user) => {
        if (user) {
          setUser(user);
          avatar.current = createAvatar(adventurer, {
            seed: user.avatar || undefined,
          }).toDataUri();
        }
      });
    }
  }, [token]);

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
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

          {user ? (
            <div>
              <IconButton
                component={Link}
                to="/profile"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                sx={{ width: 24, height: 24, p: 2 }}
              >
                {avatar.current ? (
                  <Avatar
                    alt="Profile avatar"
                    src={avatar.current}
                    sx={{ backgroundColor: "#FFB74D" }}
                  />
                ) : (
                  <AccountCircle />
                )}
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
