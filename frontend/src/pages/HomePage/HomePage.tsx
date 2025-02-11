import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Rating,
  CircularProgress,
} from "@mui/material";
import { Quest } from "../../types";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";

export const HomePage = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCreateQuest = () => {
    navigate("/create");
  };

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await axiosConfig.get("/quests");
        if (response.data && response.data.length > 0) {
          setQuests(response.data);
        } else {
          setError("No quests available at the moment.");
          console.log(response.data);
        }
      } catch (error) {
        setError("Error fetching quests. Please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading quests...
        </Typography>
      </Container>
    );
  }

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

      {error ? (
        <Typography
          variant="h6"
          sx={{ mt: 3, color: "red", textAlign: "center" }}
        >
          {error}
        </Typography>
      ) : (
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
      )}

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
