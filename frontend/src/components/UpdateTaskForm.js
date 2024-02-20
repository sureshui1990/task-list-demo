import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { API_URL } from "./../utils";

const UpdateTaskForm = ({
  isDialogOpen,
  setIsComplete,
  setDialogOpen,
  task,
  fetchTasks,
}) => {
  const { id, completed } = task;
  const [newTask, setNewTask] = useState("");
  const handleUpdateTaskName = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name: newTask,
        completed,
      });
      await fetchTasks();
      setNewTask("");
    } catch (error) {
      console.log("handleUpdateTaskName err", error);
    }
  };
  return (
    <div className="update-wrapper">
      <Dialog
        open={false}
        onClose={() => {
          // setEditOpen(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            label="Field"
            // onChange={(e) => setNewTask(e.target.value)}
            // value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button
           onClick={async() => {
            await handleUpdateTaskName();
            // setEditOpen(false);
           }}
           >Update</Button>
          <Button
            onClick={() => {
              // setEditOpen(false);
            }}
            autoFocus
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateTaskForm;
