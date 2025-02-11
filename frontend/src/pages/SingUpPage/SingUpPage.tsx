/* eslint-disable no-console */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleIcon } from "../../components/CustomIcons";
import { NavLink } from "react-router";
import { Avatar, Badge, IconButton } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { authRegister } from "../../api/Auth/authRegister";
import { userUpdateAvatar } from "../../api/User/userUpdateAvatar";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(() => ({
  height: "auto",
}));

export default function SignUpPage() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    React.useState(false);
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [avatar, setAvatar] = React.useState("1");

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const password_confirmation = document.getElementById(
      "password_confirmation"
    ) as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;

    let isValid = true;

    if (
      !email.value ||
      !/\S+@\S+\.\S+/.test(email.value) ||
      email.value.length > 255
    ) {
      setEmailError(true);
      setEmailErrorMessage(
        "Please enter a valid email address. It must contain the @ sign and no more than 255 characters"
      );
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (password.value !== password_confirmation.value) {
      setPasswordConfirmationError(true);
      setPasswordConfirmationErrorMessage("Passwords do not match");
      isValid = false;
    } else {
      setPasswordConfirmationError(false);
      setPasswordConfirmationErrorMessage("");
    }

    if (!name.value || name.value.length < 1 || name.value.length > 255) {
      setNameError(true);
      setNameErrorMessage(
        "Name is required. The name must have a minimum of 2 characters and a maximum of 255"
      );
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameError || emailError || passwordError || passwordConfirmationError) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const password_confirmation = data.get("password_confirmation") as string;

    authRegister(name, email, password, password_confirmation).then(() =>
      userUpdateAvatar(avatar)
    );
  };

  function newAvatar() {
    setAvatar(Math.random().toString(36).substr(2, 9));
  }

  return (
    <>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
            }}
          >
            Sign up
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Badge
              overlap="circular"
              sx={{ bgcolor: "primary.main", borderRadius: "50%" }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  onClick={() => newAvatar()}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#F5F5F5",
                    borderRadius: "50%",
                    "&:hover": { bgcolor: "#e0e0e0" },
                    p: 1,
                  }}
                >
                  <CasinoIcon
                    sx={{
                      fontSize: 24,
                      color: "black",
                    }}
                  />
                </IconButton>
              }
            >
              <Avatar
                alt="Profile avatar"
                src={createAvatar(adventurer, {
                  seed: avatar,
                }).toDataUri()}
                sx={{ width: 120, height: 120, p: 2 }}
              />
            </Badge>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password_confirmation">
                Confirm your password
              </FormLabel>
              <TextField
                required
                fullWidth
                name="password_confirmation"
                placeholder="••••••"
                type="password"
                id="password_confirmation"
                autoComplete="new-password"
                variant="outlined"
                error={passwordConfirmationError}
                helperText={passwordConfirmationErrorMessage}
                color={passwordConfirmationError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account? <NavLink to="/sing-in">Sign in</NavLink>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
