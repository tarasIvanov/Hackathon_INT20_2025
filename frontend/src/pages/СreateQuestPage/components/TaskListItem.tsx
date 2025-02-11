import { Box, ListItem, ListItemText, Typography } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { MediaPreview } from "./MediaPreview";
import { Task } from "../../../types/types";

interface TaskItemProps {
  task: Task;
  index: number;
  onDelete: (index: number) => void;
}

export const TaskListItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onDelete,
}) => {
  return (
    <ListItem
      key={index}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        mb: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Typography
            variant="body1"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            Task №{index + 1}
          </Typography>
          <Typography variant="body2" component="div">
            {task.name}
          </Typography>
        </Box>
        <MdOutlineDelete
          onClick={() => onDelete(index)}
          fontSize="24px"
          style={{ cursor: "pointer" }}
        />
      </Box>

      {task.media && (
        <img
          src={URL.createObjectURL(task.media)}
          alt="Task media"
          style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
        />
      )}

      {task.answerOptions.length > 0 && (
        <Box sx={{ mt: 2, width: "100%" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Answer Options:
          </Typography>
          {task.answerOptions.map((option, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                p: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
              }}
            >
              <Typography sx={{ flexGrow: 1 }}>
                {option.text} {option.isCorrect && "(Correct)"}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </ListItem>
  );
};
