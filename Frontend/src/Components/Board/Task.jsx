import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Task = ({ list, getList, setShowTaskInput }) => {
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addNewTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      console.log("Task name is required");
      return;
    }

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/create`,
        {
          name: newTask,
          listId: list._id,
          userId,
          listName: list.name,
        }
      );

      console.log("Task created:", data.data);
      setNewTask("");
      getList();
      setShowTaskInput(false);
    } catch (err) {
      console.log("Error creating task:", err);
    }
  };

  return (
    <form onSubmit={addNewTask} className="mt-2">
      <input
        ref={inputRef}
        className="w-full bg-gray-700/80 text-white border border-gray-600 rounded-md px-3 py-2 shadow-sm outline-none placeholder-gray-400 focus:border-[#fcfcfc] focus:bg-gray-700 transition-all"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task name"
      />

      <div className="mt-2 flex items-center space-x-2">
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-800 text-white uppercase px-4 py-1.5 rounded-md transition-colors"
        >
          Add Task
        </button>

        <button
          type="button"
          onClick={() => setShowTaskInput(false)}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default Task;
