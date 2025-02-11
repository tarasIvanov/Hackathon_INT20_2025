import { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  Box,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosSave } from "react-icons/io";
import { Task, Quest } from "../../types/types";
import { AddTask } from "./components/AddTask";
import { MediaPreview } from "./components/MediaPreview";
import { TasksContainer } from "./components/TasksContainer";
import { UploadMediaButton } from "./components/UploadMediaButton";
import api from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./CreateQuestPage.module.scss";

export const CreateQuestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/sign-in", { state: { from: location.pathname } });
  }, [navigate, location]);

  const [quest, setQuest] = useState<Partial<Quest>>({
    name: "",
    description: "",
    time_limit: 5, // змінив timeLimit на time_limit
    tasks: [],
    image: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    time_limit: "", // змінив timeLimit на time_limit
  });

  const [addingNewTask, setAddingNewTask] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    description: "",
    type: "Multiple Choice",
    answer_options: [], // змінив answerOptions на answer_options
    media: null,
  });

  const handleQuestChange = (field: keyof Quest, value: string | number) =>
    setQuest((prev) => ({ ...prev, [field]: value }));

  const handleTaskChange = (field: keyof Task, value: string | any) =>
    setNewTask((prev) => ({ ...prev, [field]: value }));

  const uploadQuestImage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuest((prev) => ({ ...prev, image: e.target.files?.[0] || null }));

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", time_limit: "" }; // змінив timeLimit на time_limit

    if (!quest.name.trim()) {
      newErrors.name = "Quest name is required";
      isValid = false;
    }
    if (quest.name.trim().length < 5) {
      newErrors.name = "Quest name must be at least 5 characters";
      isValid = false;
    }
    if (!quest.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (quest.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }
    if (!quest.time_limit) {
      // змінив timeLimit на time_limit
      newErrors.time_limit = "Time limit is required";
      isValid = false;
    }
    if (+quest.time_limit <= 0) {
      // змінив timeLimit на time_limit
      newErrors.time_limit = "Time limit must be greater than 0";
      isValid = false;
    }
    if (+quest.time_limit > 1440) {
      // змінив timeLimit на time_limit
      newErrors.time_limit = "Time limit cannot exceed 24 hours";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSaveQuestClick = async () => {
    if (!validateForm())
      return toast.error("Please correct the errors before saving");
    if (quest.tasks.length === 0)
      return toast.error("Quest must have at least one task!");

    try {
      // Створення нового масиву tasks без полів media та type бо на бекенді його немає
      const tasksWithoutMediaAndType = quest.tasks.map(
        ({ media, type, ...task }) => task
      );

      const questData = {
        name: quest.name,
        description: quest.description,
        time_limit: quest.time_limit, // змінив timeLimit на time_limit
        tasks: tasksWithoutMediaAndType,
      };
      console.log(questData);

      const response = await api.post("v1/quests", questData);
      console.log(response);
      toast.success("Quest saved successfully!");
    } catch (error) {
      toast.error(
        "Error saving quest: " +
          (error?.response?.data?.message || error.message)
      );
    }
  };

  const handleSaveTaskClick = () => {
    setQuest((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { ...newTask, points: 10 }],
    }));
    setNewTask({
      name: "",
      description: "",
      type: "Multiple Choice",
      answer_options: [], // змінив answerOptions на answer_options
      media: null,
    });
    setAddingNewTask(false);
  };

  return (
    <>
      <Box className={style.addingTaskBlock}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Creating a new quest
        </Typography>

        <Box sx={{ width: "100%", boxSizing: "border-box" }}>
          <Box className={style.questInputsContainer}>
            <FormControl>
              <FormLabel>Quest name</FormLabel>
              <TextField
                name="name"
                placeholder="Special math quest..."
                value={quest.name}
                onChange={(e) => handleQuestChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quest description</FormLabel>
              <TextField
                name="description"
                placeholder="Very long and useful description..."
                value={quest.description}
                onChange={(e) =>
                  handleQuestChange("description", e.target.value)
                }
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={10}
                fullWidth
              />
            </FormControl>
            {quest.image && (
              <MediaPreview
                media={quest.image}
                onDelete={() => setQuest({ ...quest, image: null })}
              />
            )}
            <UploadMediaButton
              buttonText="Add quest image"
              onChange={uploadQuestImage}
            />
            <FormControl>
              <FormLabel>Time limit (min)</FormLabel>
              <TextField
                placeholder="60"
                name="timeLimit"
                type="number"
                value={quest.time_limit} // змінив timeLimit на time_limit
                onChange={(e) =>
                  handleQuestChange("time_limit", e.target.value)
                } // змінив timeLimit на time_limit
                error={!!errors.time_limit} // змінив timeLimit на time_limit
                helperText={errors.time_limit} // змінив timeLimit на time_limit
                fullWidth
                required
              />
            </FormControl>
          </Box>
        </Box>

        {quest.tasks.length > 0 && (
          <TasksContainer
            tasks={quest.tasks}
            onDelete={(index) =>
              setQuest((prev) => ({
                ...prev,
                tasks: prev.tasks.filter((_, i) => i !== index),
              }))
            }
          />
        )}
        {!addingNewTask && (
          <Box className={style.questButtonsContainer}>
            <Button variant="contained" onClick={() => setAddingNewTask(true)}>
              Add task
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleSaveQuestClick}
              endIcon={<IoIosSave />}
            >
              Save quest
            </Button>
          </Box>
        )}
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />

      {addingNewTask && (
        <AddTask
          newTask={newTask}
          setNewTask={setNewTask}
          handleTaskChange={handleTaskChange}
          handleFileUpload={(e) =>
            handleTaskChange("media", e.target.files?.[0])
          }
          handleSaveTaskClick={handleSaveTaskClick}
          handleCancelCreatingTask={() => setAddingNewTask(false)}
        />
      )}
    </>
  );
};
