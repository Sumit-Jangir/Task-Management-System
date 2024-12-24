import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisH,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ list, getList }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openListOptions, setOpenListOptions] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/task/${list._id}`
      );
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [list]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text");

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
  };

  const handleOpenListOptions = (e) => {
    const rect = e.target.getBoundingClientRect(); // Get the position of the clicked button
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setOpenListOptions(true);
  };

  return (
    <>
      <div
        className="min-w-64 h-fit bg-gray-900 text-white rounded-xl p-4 m-4 shadow-lg flex flex-col"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <h3 className="text-lg font-semibold">{list.name}</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleOpenListOptions}
              className="text-gray-400 hover:text-gray-200"
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-2 mt-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-800 text-white rounded-md px-3 py-2 shadow-sm"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, task._id)}
            >
              {task.name}
            </div>
          ))}
        </div>

        {/* Add Task */}
        <button
          className="mt-3 text-sm flex items-center space-x-2 text-gray-400 hover:text-gray-200"
          onClick={() => setShowTaskInput(!showTaskInput)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add a card</span>
        </button>

        {/* Render Task Input if visible */}
        {showTaskInput && <Task list={list} getList={getList} />}
      </div>

      {/* Options Modal */}
      {openListOptions && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-5"
        onClick={() => setOpenListOptions(false)}>
          <div
            className="relative text-slate-300 min-w-64 bg-gray-800  rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between border-b border-gray-700 pb-2 px-2">
              <span className="text-right min-w-36 ">List Options</span>
              <button onClick={() => setOpenListOptions(false)} className="">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div>
            <label>Change Color:</label>
                <input
                  type="color"
                  value={list.color}
                  onChange={(e) => updateListColor(list._id, e.target.value)} // Use updateListColor
                />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
