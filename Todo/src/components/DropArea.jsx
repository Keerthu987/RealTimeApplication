import React, { useState } from 'react'
import './DropArea.css'
const DropArea = ({onDrop}) => {
    const [showDrop,setShowDrop]=useState(false);
  return (

   <section
  onDrop={(e) => {
    e.preventDefault();
    const index = parseInt(e.dataTransfer.getData("text/plain"), 10);
    onDrop?.(index);  // Pass dragged task index
    setShowDrop(false);
  }}
  onDragOver={(e) => e.preventDefault()}
  onDragEnter={() => setShowDrop(true)}
  onDragLeave={() => setShowDrop(false)}
  className={showDrop ? "drop_area" : "hide_drop"}
>
  Drop
</section> )
}

export default DropArea
