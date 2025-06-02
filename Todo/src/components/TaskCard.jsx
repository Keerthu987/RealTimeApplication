import React from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({ title, tags ,handleDelete ,index ,setActiveCard }) => {
  return (
    <article className="task_card" draggable    onDragStart={(e) => {
    e.dataTransfer.setData("text/plain", index); // 🟢 this carries the index
    setActiveCard(index);                        // (optional) visual state
  }} onDragEnd={()=>setActiveCard(null)}>
      <p className="task_text">{title}</p>

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected ={true} />
          ))}
        </div>
        <div className="task_delete" onClick={()=>handleDelete(index)} >
          <img src={deleteIcon} className="delete_icon" alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
