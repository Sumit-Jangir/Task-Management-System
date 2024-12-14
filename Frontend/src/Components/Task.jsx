import axios from "axios";
import React, { useState } from "react";

const Task = ({ list, getList }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(true);
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    if (!newTask.trim()) {
      console.log("Task name is required");
      return;
    }

    try {
      const data = await axios.post("http://localhost:3000/task/create", {
        name: newTask,
        listId: list._id,
      });

      console.log("Task created:", data.data);
      setNewTask("");
      getList();
    } catch (err) {
      console.log("Error creating task:", err);
    }
  };

  return (
    <>
      {isAddModalOpen && (
      <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-200 py-4 px-5 rounded-lg shadow-lg max-w-md w-full relative">
          <span
            className="text-gray-700 hover:text-gray-800 cursor-pointer text-4xl font-bold absolute top-0 right-3"
            onClick={() => setIsAddModalOpen(false)}
          >
            &times;
          </span>
          <h3 className="text-xl font-bold pb-4">Add New List</h3>

          <form onSubmit={addNewTask} className="flex flex-col gap-2">
            <label>
              Name:
              <input
                className="w-full border rounded p-2 outline-none bg-white"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task name"
              />
            </label>

            <button
              type="submit"
              className="bg-black text-white uppercase mt-3 px-4 py-2 rounded float-end"
            >
              Save
            </button>
          </form>
        </div>
      </div>
       )}
    </>
  );
};

export default Task;
