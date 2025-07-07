import React, { useState,useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
// import TaskCard from './components/TaskCard';
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTask =localStorage.getItem("tasks")
console.log(oldTask)
const App = () => {
  const [task, setTask] = useState(JSON.parse(oldTask)|| []);
  const [activeCard,setActiveCard] =useState(null)
  useEffect(()=>{
      localStorage.setItem("tasks",JSON.stringify(task))
  },[task])
  const handleDelete = (taskInd) => {
    const newTask = task.filter((t, ind) => ind != taskInd);
    setTask(newTask);
  };
  // console.log("taskf",task)
  const onDrop = (status, index, draggedIndex) => {
  if (draggedIndex == null || draggedIndex === undefined) return;

  const taskToMove = task[draggedIndex];
  const updatedTask = task.filter((_, ind) => ind !== draggedIndex);
  updatedTask.splice(index, 0, { ...taskToMove, status });
  setTask(updatedTask);
};
  return (
    <div className="app">
      <TaskForm setTask={setTask} />
      <main className="app_main">
        <TaskColumn onDrop={onDrop} setActiveCard={setActiveCard} handleDelete={handleDelete} title="To do" icon={todoIcon} status="todo" task={task} />
        <TaskColumn onDrop={onDrop} setActiveCard={setActiveCard} handleDelete={handleDelete} title="Doing" icon={doingIcon} status="doing" task={task} />
        <TaskColumn onDrop={onDrop} setActiveCard={setActiveCard} handleDelete={handleDelete} title="Done" icon={doneIcon} status="done" task={task} />
      </main>

      
    </div>
  );
};

export default App;
