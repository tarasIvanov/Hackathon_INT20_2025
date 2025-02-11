import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";

import { Quest } from "../types";

export const QuestCard = ({ questObj }: { questObj: Quest }) => {
  return (
    <Card key={questObj.id} sx={{ width: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image={
          questObj.image
            ? URL.createObjectURL(questObj.image)
            : "https://picsum.photos/300/200"
        }
        alt={questObj.name}
      />
      <CardContent>
        <Typography variant="h6">{questObj.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {questObj.description}
        </Typography>
        <Rating value={questObj.rating} precision={0.1} readOnly />
        <Typography variant="body2">{questObj.reviewCount} reviews</Typography>
      </CardContent>
    </Card>
  );
};
