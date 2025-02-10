import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import { Quest } from "../../types/types";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      name: "Secrets of the Old Town",
      description: "Uncover the mysteries of the old town and find treasures!",
      timeLimit: 60,
      tasks: [],
      image: null,
      authorId: 101,
      rating: 4.7,
      reviewCount: 134,
    },
    {
      id: 2,
      name: "The Lost Artifact",
      description: "Help find the lost artifact of an ancient civilization.",
      timeLimit: 45,
      tasks: [],
      image: null,
      authorId: 102,
      rating: 4.9,
      reviewCount: 89,
    },
    {
      id: 3,
      name: "Escape the Labyrinth",
      description: "Find your way out of a confusing labyrinth!",
      timeLimit: 30,
      tasks: [],
      image: null,
      authorId: 103,
      rating: 4.5,
      reviewCount: 210,
    },
  ]);

  const navigate = useNavigate();

  const handleCreateQuest = () => {
    navigate("/create");
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Create and Play Unique Quests!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Adventures, puzzles, and challenges — all in one place.
      </Typography>

      <Typography variant="h4" sx={{ mt: 3 }}>
        Popular Quests
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 3,
          mt: 5,
        }}
      >
        {quests.map((quest) => (
          <Card key={quest.id} sx={{ width: 300 }}>
            <CardMedia
              component="img"
              height="140"
              image={
                quest.image
                  ? URL.createObjectURL(quest.image)
                  : "https://picsum.photos/300/200"
              }
              alt={quest.name}
            />
            <CardContent>
              <Typography variant="h6">{quest.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {quest.description}
              </Typography>
              <Rating value={quest.rating} precision={0.1} readOnly />
              <Typography variant="body2">
                {quest.reviewCount} reviews
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          mt: 5,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5">
          Didn't find what you were looking for?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Create your own quest and share it with others!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleCreateQuest}
          sx={{ mt: 2 }}
        >
          Create Quest
        </Button>
      </Box>
    </Container>
  );
};
