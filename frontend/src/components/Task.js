import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import axios from "axios";
import { API_URL } from "./../utils";
import UpdateTaskForm from "./UpdateTaskForm";

const Task = ({ task,fetchTasks }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed || false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !completed,
      });
      setIsComplete(prev => !prev);
    } catch (error) {
      console.log("handleUpdateTaskCompletion err", error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (error) {
      console.log("Task handleDelete err", error);
    }
  };

  return (
    <div className="task-list" key={id}>
      <label
        id={`task-${id}`}
        className={`cursor ${completed ? "checked" : ""}`}
      >
        <Checkbox
          checked={completed}
          inputProps={{ "aria-label": "controlled" }}
          htmlFor={`task-${id}`}
          onClick={handleUpdateTaskCompletion}
        />
        {name}
      </label>
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <EditIcon></EditIcon>
      </Button>

      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={handleDelete}
      >
        <DeleteIcon></DeleteIcon>
      </Button>
      <UpdateTaskForm
        isDialogOpen={isDialogOpen}
        setIsComplete={setIsComplete}
        setDialogOpen={setDialogOpen}
        task={task}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default Task;
