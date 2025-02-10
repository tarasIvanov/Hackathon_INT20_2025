import { Typography, Box, List } from "@mui/material";
import { TaskListItem } from "./TaskListItem";
import { Task } from "../types";

interface TasksProps {
  tasks: Task[];
  onDelete: (index: number) => void;
}

export const TasksContainer: React.FC<TasksProps> = ({ tasks, onDelete }) => {
  return (
    <Box
      sx={{ mt: 4, width: "100%", padding: "15px", boxSizing: "border-box" }}
    >
      <Typography variant="h4" align="left" sx={{ mb: 2 }}>
        Tasks
      </Typography>

      <List>
        {tasks.map((task, index) => (
          <TaskListItem
            task={task}
            index={index}
            onDelete={onDelete}
          ></TaskListItem>
        ))}
      </List>
    </Box>
  );
};
