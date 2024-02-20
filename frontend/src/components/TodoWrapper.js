import React, { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import UpdateTaskForm from "./UpdateTaskForm";
import axios from "axios";
import { API_URL } from "./../utils";

const data = {
  id: 223,
  name: "do forming",
  completed: false,
};

const TodoWrapper = () => {
  const [taskList, setTaskList] = useState([]);
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTaskList(data);
    } catch (error) {
      console.log('TodoWrapper',error);
    }
  };
  // useEffect(() => {
  //   fetchTasks();
  // }, []);
  const hasTaskItems =
    taskList !== null && Array.isArray(taskList) && Array.length > 0;
  return (
    <section>
      <AddTaskForm fetchTasks={fetchTasks} />
      {hasTaskItems &&
        taskList.map((task) => (
          <Task key={task.id} task={task} fetchTasks={fetchTasks} />
        ))}
    </section>
  );
};
export default TodoWrapper;
