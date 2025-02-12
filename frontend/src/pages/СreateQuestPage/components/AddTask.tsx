import { useState } from "react";
import {
  TextField,
  Typography,
  MenuItem,
  Select,
  FormLabel,
  FormControl,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { MdOutlineDelete, MdTaskAlt } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadMediaButton } from "./UploadMediaButton";
import style from "../CreateQuestPage.module.scss";
import { IoIosSave, IoIosArrowBack } from "react-icons/io";

interface AddTaskProps {
  newTask: Task;
  handleSaveTaskClick: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskChange: (field: keyof Task, value: string | File | null) => void;
  handleCancelCreatingTask: () => void;
  setNewTask: (newTask: Task) => void;
}

export const AddTask: React.FC<AddTaskProps> = ({
  newTask,
  handleTaskChange,
  handleFileUpload,
  handleSaveTaskClick,
  handleCancelCreatingTask,
  setNewTask,
}) => {
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    answers: "",
  });

  const validateTask = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", answers: "" };

    if (!newTask.name.trim()) {
      newErrors.name = "Task name is required";
      isValid = false;
    }

    if (!newTask.description.trim()) {
      newErrors.description = "Task description is required";
      isValid = false;
    }

    if (newTask.type === "Multiple Choice") {
      if (newTask.answer_options.length < 2) {
        newErrors.answers = "At least two answers are required";
        isValid = false;
      } else if (!newTask.answer_options.some((option) => option.is_correct)) {
        newErrors.answers = "At least one correct answer is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveClick = () => {
    if (validateTask()) {
      handleSaveTaskClick();
    }
  };

  const handleAddAnswer = () => {
    setNewTask((prevTask) => ({
      ...prevTask,
      answer_options: [
        ...prevTask.answer_options,
        { name: "", is_correct: false },
      ],
    }));
  };

  const handleAnswerTextChange = (index: number, name: string) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      answer_options: prevTask.answer_options.map((option, i) =>
        i === index ? { ...option, name } : option
      ),
    }));
  };

  const handleAnswerCorrectChange = (index: number, isCorrect: boolean) => {
    if (newTask.type === "Open Answer") return;
    setNewTask((prevTask) => ({
      ...prevTask,
      answer_options: prevTask.answer_options.map((option, i) =>
        i === index ? { ...option, is_correct: isCorrect } : option
      ),
    }));
  };

  return (
    <Box className={style.addingTaskBlock}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          width: "100%",
        }}
      >
        <Box className={style.headerAndIcon}>
          <MdTaskAlt fontSize="32px" />
          <Typography variant="h5">Adding new task</Typography>
        </Box>

        <Button
          onClick={handleCancelCreatingTask}
          color="error"
          variant="contained"
        >
          <IoIosArrowBack />
          Cancel
        </Button>
      </Box>

      <Box className={style.inputs}>
        <FormControl fullWidth>
          <FormLabel sx={{ textAlign: "left" }}>Task name</FormLabel>
          <TextField
            placeholder="Calculate..."
            fullWidth
            value={newTask.name}
            onChange={(e) => handleTaskChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel sx={{ textAlign: "left" }}>Task description</FormLabel>
          <TextField
            placeholder="Calculate the expression using..."
            multiline
            rows={6}
            fullWidth
            value={newTask.description}
            onChange={(e) => handleTaskChange("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
        </FormControl>

        {newTask.media && (
          <Box sx={{ mt: 2, position: "relative" }}>
            <MdOutlineDelete
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                cursor: "pointer",
                fontSize: "40px",
              }}
              onClick={() => handleTaskChange("media", null)}
            />
            {newTask.media.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(newTask.media)}
                alt="Uploaded media"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <video controls style={{ maxWidth: "100%" }}>
                <source
                  src={URL.createObjectURL(newTask.media)}
                  type={newTask.media.type}
                />
                Your browser does not support the video tag.
              </video>
            )}
          </Box>
        )}

        <UploadMediaButton
          buttonText="Add media to task"
          onChange={handleFileUpload}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel sx={{ textAlign: "left" }}>Answer type</FormLabel>
          <Select
            fullWidth
            value={newTask.type}
            onChange={(e) => handleTaskChange("type", e.target.value as string)}
          >
            <MenuItem value="Open Answer">Open Answer</MenuItem>
            <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 3, width: "100%" }}>
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Answer Options
        </Typography>

        {newTask.answer_options.map((option, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <TextField
              label={`Answer ${index + 1}`}
              sx={{ flexGrow: 1, mr: 2 }}
              value={option.name} // Замінив text на name
              onChange={(e) => handleAnswerTextChange(index, e.target.value)}
            />
            {newTask.type === "Multiple Choice" && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={option.is_correct}
                    onChange={(e) =>
                      handleAnswerCorrectChange(index, e.target.checked)
                    }
                  />
                }
                label="Correct"
              />
            )}
          </Box>
        ))}

        {errors.answers && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.answers}
          </Typography>
        )}

        <Button sx={{ mt: 2 }} variant="outlined" onClick={handleAddAnswer}>
          Add Answer
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3 }}
          onClick={handleSaveClick}
          startIcon={<IoIosSave />}
        >
          Save task
        </Button>
      </Box>

      <ToastContainer autoClose={3000} />
    </Box>
  );
};
