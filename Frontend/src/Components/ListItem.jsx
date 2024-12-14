import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ list, getList }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  console.log("ListID<><<<<<<<<<<<<>", list._id);

  const getTasks = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/task/${list._id}`
      );
      setTasks(response.data);
      console.log("Tasks fetched for list:", response);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    getTasks();
  }, [list]);

  const handleDragStart = (e, taskId) => {
    console.log("Dragging task ID:", taskId);
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text");
    console.log("Dropped task ID:", taskId);

    try {
      await axios.put(`${import.meta.env.VITE_API_KEY}/task/update/${taskId}`, {
        listId: list._id,
      });
      getTasks();
      getList();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("Drag over detected");
  };

  return (
    <div
      className="min-w-52 border-2 rounded-md border-black m-4 text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-evenly items-center border-b-2 border-black p-3 text-xl">
        <button
          className="border-2 border-black px-3 py-2 text-2xl rounded-full bg-gray-200"
          onClick={() => setShowTaskInput(!showTaskInput)}
        >
          {/* {showTaskInput ? "Cancel" : "+ Add Task"} */}
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <h3>{list.name}</h3>
      </div>

      {showTaskInput && <Task list={list} getList={getList} />}

      <div>
        {
          tasks.length > 0 &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="border border-black rounded-sm p-2 m-2"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, task._id)}
            >
              <span>{task.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ListItem;
