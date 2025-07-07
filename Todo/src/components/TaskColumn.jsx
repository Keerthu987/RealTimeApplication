import React from "react";
// import Todo from "../assets/direct-hit.png"
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({ title, icon, task, status, handleDelete,setActiveCard,onDrop }) => {
  // console.log(Todo)
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img src={icon} alt="" className="task_column_icon" />
        {title}
      </h2>
<DropArea onDrop={(draggedIndex) => onDrop(status, 0, draggedIndex)} />      {task
        .filter((t) => t.status === status)
        .map((t, ind) => (
          <React.Fragment key={ind}>
          <TaskCard setActiveCard={setActiveCard} handleDelete={handleDelete}   title={t.task} tags={t.tags}  index={task.indexOf(t)} />
          
          {/* <DropArea onDrop={ onDrop} status={status} index={ind+1} /> */
          }
<DropArea onDrop={(draggedIndex) => onDrop(status, task.indexOf(t)+1 , draggedIndex)} />
          </React.Fragment >
        ))}
    </section>
  );
};

export default TaskColumn;
