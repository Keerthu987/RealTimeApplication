import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";
const TaskForm = ({setTask}) => {
  // const [task, setTask] = useState("");
  // const [status, setStatus] = useState("todo");
  // const handleTaskChange = (e) => {
  //   setTask(e.target.value);
  // };
  //   const handleStatusChange = (e) => {
  //   setStatus(e.target.value);
  // };
  // console.log(task);
  // console.log(status);

  const [taskData,setTaskData]=useState({
    task:"",
    status:"todo",
    tags :[]
  })
  const checkTag =(tag)=>{
return taskData.tags.some(item=>item===tag)
  }
  const selectTag =(tag) =>{
    if(checkTag(tag)){
    const filteredTags=  taskData.tags.filter(item=>item!==tag)
    setTaskData (prev=>{
      return {...prev,tags:filteredTags}
    })
  }
  else{
    setTaskData(prev=>{
      return {...prev,tags:[...prev.tags,tag]}
    })
  }
  }
  // console.log(taskData.tags)
  const handleChange = (e) =>{
      // const name=e.target.name;
      // const value=e.target.value;
      const {name,value}=e.target;
      // console.log({name,value})
      setTaskData((prev) =>{
        return {...prev,[name]:value}
      })
     
  }

  const handleSubmit =(e)=>{
    e.preventDefault()

console.log(taskData)
setTask(prev =>{
  return [...prev,taskData]
})
setTaskData({
    task:"",
    status:"todo",
    tags :[]
  })
  }
   
  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
        name="task"
        value={taskData.task}
          type="text"
          className="task_input"
          // onChange={(e) => handleTaskChange(e)}
          // onChange={handleTaskChange}
          onChange={handleChange}
          placeholder="Enter your task"
        />
        <div className="task_form_bottom_line"></div>
        <div>
          <Tag tagName="HTML" selectTag={selectTag} selected={checkTag("HTML")} />
          <Tag tagName="CSS" selectTag={selectTag} selected={checkTag("CSS")}  />
          <Tag tagName="JavaScript" selectTag={selectTag} selected={checkTag("JavaScript")} />
          <Tag tagName="React" selectTag={selectTag} selected={checkTag("React")}  />
        </div>

        <div>
          <select name="status" className="task_status" value={taskData.status} onChange={handleChange} >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>

          <button type="submit" className="task_submit">
            {" "}
            +Add Task{" "}
          </button>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
