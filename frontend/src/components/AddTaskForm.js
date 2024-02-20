import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "./../utils";

const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");
  const addNewTask = async () => {
    try {
      await axios.post(API_URL, {
        name: newTask,
        complete: false,
      });
      await fetchTasks();
      setNewTask("");
    } catch (error) {
      console.log("AddTaskForm error", error);
    }
  };
  return (
    <div className="wrapper">
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        My Task
      </Typography>
      <div className="form">
        <TextField
          size="small"
          id="outlined-basic"
          label="Add task"
          variant="outlined"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="outline" onClick={addNewTask}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};

export default AddTaskForm;
