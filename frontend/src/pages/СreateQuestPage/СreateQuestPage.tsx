import style from "./CreateQuestPage.module.scss";
import { useState } from "react";
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
import { Task, Quest } from "../../types/types";
import { AddTask } from "./components/AddTask";
import { MediaPreview } from "./components/MediaPreview";
import { TasksContainer } from "./components/TasksContainer";
import { IoIosSave } from "react-icons/io";
import { UploadMediaButton } from "./components/UploadMediaButton";
import axiosConfig from "../../api/axiosConfig";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const СreateQuestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/sing-in", { state: { from: location.pathname } });
    }
  }, [navigate, location]);

  const [quest, setQuest] = useState<Partial<Quest>>({
    name: "",
    description: "",
    timeLimit: 5,
    tasks: [],
    image: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    timeLimit: "",
  });

  const [addingNewTask, setAddingNewTask] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    text: "",
    type: "Multiple Choice",
    answerOptions: [],
    media: null,
  });

  const uploadQuestImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setQuest((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleQuestChange = (field: keyof Quest, value: string | number) => {
    setQuest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", timeLimit: "" };

    if (!quest.name.trim()) {
      newErrors.name = "Quest name is required";
      isValid = false;
    } else if (quest.name.trim().length < 5) {
      newErrors.name = "Quest name must be at least 5 characters long";
      isValid = false;
    }

    if (!quest.description.trim()) {
      newErrors.description = "Quest description is required";
      isValid = false;
    } else if (quest.description.trim().length < 10) {
      newErrors.description =
        "Quest description must be at least 10 characters long";
      isValid = false;
    }

    if (!quest.timeLimit) {
      newErrors.timeLimit = "Time limit is required";
      isValid = false;
    } else if (+quest.timeLimit <= 0) {
      newErrors.timeLimit = "Time limit must be greater than 0";
      isValid = false;
    } else if (+quest.timeLimit > 1440) {
      newErrors.timeLimit = "Time limit cannot exceed 24 hours (1440 minutes)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveTaskClick = () => {
    setQuest((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));

    setNewTask({
      name: "",
      text: "",
      type: "Multiple Choice",
      answerOptions: [],
      media: null,
    });

    setAddingNewTask(false);
  };

  const handleDeleteTask = (index: number) => {
    setQuest((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleCancelCreatingTask = () => {
    setAddingNewTask(false);
  };

  const handleSaveQuestClick = async () => {
    if (!validateForm()) {
      toast.error("Please correct the errors before saving");
      return;
    }

    if (quest.tasks.length === 0) {
      toast.error("The quest must have at least one task!");
      return;
    }

    try {
      const response = await axiosConfig.post("quests", {
        quest,
      });
      toast.success("Quest saved successfully!");
    } catch (error) {
      toast.error(
        "Error saving quest: " +
          ((error as any).response?.data?.message || (error as any).message)
      );
    }
    console.log("Saving quest:", quest);
  };

  return (
    <>
      <Box className={style.addingTaskBlock}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Creating a new quest
          </Typography>
        </Box>

        <Box sx={{ width: "100%", boxSizing: "border-box" }}>
          <form className={style.questInputsContainer}>
            <FormControl>
              <FormLabel sx={{ textAlign: "left" }}>Quest name</FormLabel>
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
              <FormLabel sx={{ textAlign: "left" }}>
                Quest description
              </FormLabel>
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
            ></UploadMediaButton>

            <FormControl>
              <FormLabel sx={{ textAlign: "left" }}>Time limit (min)</FormLabel>
              <TextField
                placeholder="60"
                name="timeLimit"
                type="number"
                value={quest.timeLimit}
                onChange={(e) => handleQuestChange("timeLimit", e.target.value)}
                error={!!errors.timeLimit}
                helperText={errors.timeLimit}
                fullWidth
                required
              />
            </FormControl>
          </form>

          {quest.tasks.length > 0 && (
            <TasksContainer tasks={quest.tasks} onDelete={handleDeleteTask} />
          )}
        </Box>

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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>

      {addingNewTask && (
        <AddTask
          newTask={newTask}
          setNewTask={setNewTask}
          handleTaskChange={(field, value) =>
            setNewTask((prev) => ({ ...prev, [field]: value }))
          }
          handleFileUpload={(event) => {
            const file = event.target.files?.[0] || null;
            if (file) {
              setNewTask((prev) => ({ ...prev, media: file }));
            }
          }}
          handleSaveTaskClick={handleSaveTaskClick}
          handleCancelCreatingTask={handleCancelCreatingTask}
        />
      )}
    </>
  );
};
