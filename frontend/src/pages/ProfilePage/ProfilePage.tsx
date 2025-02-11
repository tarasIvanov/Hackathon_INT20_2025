import {
  Box,
  Typography,
  Avatar,
  Button,
  Container,
  Paper,
  Rating,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { UserProfile } from "../../types";
import { MdOutlineEmail, MdDateRange } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { userGet } from "../../api/User/userGet";

export const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("access_token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/sign-in", { state: { from: location.pathname } });
        return;
      }

      try {
        const response = await userGet(token);
        console.log(response);
        setUserProfile({
          avatarUrl: createAvatar(adventurer, {
            seed: response.avatar,
          }).toDataUri(),

          name: response.name,
          userEmail: response.email,
          createdAt: new Date(response.createdAt),
          createdQuests: [],
          completedQuests: [],
          userRating: 0,
          reviewCount: 0,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, location]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        border: "1px solid black",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "2px 3px 3px rgb(66, 66, 66)",
      }}
    >
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "black",
          my: 3,
          ml: 2,
        }}
      >
        User profile
      </Typography>
      <Divider sx={{ mb: 3, mx: 3, borderColor: "rgb(66, 66, 66)" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          padding: "20px",
        }}
      >
        {/* personal info */}
        <Box>
          {/* avatar + name + rating */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "20px",
              mb: 5,
            }}
          >
            <Avatar
              alt={userProfile.name}
              src={userProfile.avatarUrl}
              sx={{ width: 120, height: 120, backgroundColor: "#FFB74D" }}
            />

            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {userProfile.name}
              </Typography>

              <Rating
                name="user-rating"
                value={userProfile.userRating}
                precision={0.01}
                readOnly
                size="large"
              />

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {userProfile.userRating +
                  ` based on ${userProfile.reviewCount} reviews`}
              </Typography>
            </Box>
          </Box>

          {/* email + reg date */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <MdOutlineEmail fontSize="32px" />
              <Typography variant="body1" color="textSecondary">
                {userProfile.userEmail}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MdDateRange fontSize="32px"></MdDateRange>
              <Typography variant="body1" color="textSecondary">
                with us from{" "}
                {userProfile.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Created Quests */}
        <Box sx={{ mb: 5, mt: { xs: 0, md: 20 }, mx: { xs: 0, md: 3 } }}>
          <Typography variant="h5" gutterBottom>
            Created Quests
          </Typography>
          {userProfile.createdQuests.length == 0 && (
            <Typography variant="body1" color="textSecondary">
              Missing
            </Typography>
          )}
          {userProfile.createdQuests.map((quest) => (
            <Paper
              key={quest.id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box>
                <CiImageOn fontSize="64px" />
              </Box>
              <Box>
                <Typography variant="h6">{quest.name}</Typography>
                <Typography variant="body1">{quest.description}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {quest.rating} ({quest.reviewCount} reviews)
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Completed Quests */}
        <Box sx={{ mb: 5, mt: { xs: 0, md: 20 } }}>
          <Typography variant="h5" gutterBottom>
            Completed Quests
          </Typography>
          {userProfile.completedQuests.length == 0 && (
            <Typography variant="body1" color="textSecondary">
              Missing
            </Typography>
          )}
          {userProfile.completedQuests.map((quest) => (
            <Paper
              key={quest.id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box>
                <CiImageOn fontSize="64px" />
              </Box>
              <Box>
                <Typography variant="h6">{quest.name}</Typography>
                <Typography variant="body1">{quest.description}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {quest.rating} ({quest.reviewCount} reviews)
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 3, mx: 3, borderColor: "rgb(66, 66, 66)" }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
        <Button
          variant="contained"
          startIcon={<Logout />}
          color="error"
          onClick={handleLogout}
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};
