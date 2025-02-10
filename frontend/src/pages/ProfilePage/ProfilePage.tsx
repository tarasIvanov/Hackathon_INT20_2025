import {
  Box,
  Typography,
  Avatar,
  Button,
  Container,
  Paper,
  Rating,
  Divider,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { UserProfile } from "../../types/types";
import { MdOutlineEmail, MdDateRange } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";

export const ProfilePage = () => {
  const userProfile: UserProfile = {
    id: "12345",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://example.com/avatar.jpg",
    userRating: 4.3,
    createdAt: new Date(),
    isVerified: true,
    createdQuests: [
      {
        id: 1,
        name: "Math Challenge",
        description: "Solve these math problems in 30 minutes.",
        timeLimit: 30,
        tasks: [],
        image: null,
        authorId: 12345,
        rating: 4.5,
        reviewCount: 10,
      },
    ],
    completedQuests: [
      {
        id: 2,
        name: "History Quiz",
        description: "Test your knowledge of world history.",
        timeLimit: 20,
        tasks: [],
        image: null,
        authorId: 67890,
        rating: 4.7,
        reviewCount: 15,
      },
      {
        id: 3,
        name: "Math Quiz",
        description: "Test your knowledge of basic algebta.",
        timeLimit: 20,
        tasks: [],
        image: null,
        authorId: 67890,
        rating: 4.8,
        reviewCount: 18,
      },
    ],
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

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
          <Box></Box>
          {/* avatar + + name  rating  */}
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
              sx={{ width: 120, height: 120 }}
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
                {userProfile.userRating + " based on 121 reviews"}
              </Typography>
            </Box>
          </Box>

          {/* email + reg date */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <MdOutlineEmail fontSize="32px" />
              <Typography variant="body1" color="textSecondary">
                {userProfile.email}
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
