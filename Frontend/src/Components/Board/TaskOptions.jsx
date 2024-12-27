import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios"; // Import axios

const ListOptions = ({ task, list, setOpenTaskOptions, selectedTaskId }) => {
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isTaskFeatureOpen, setIsTaskFeatureOpen] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleSave = async () => {
    if(startDate){
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/task/startDate`,
          {
            taskId: selectedTaskId,
            startDate,
          }
        );

        if (response.status === 200) {
          console.log("chal gai dateeee",selectedTaskId)
          setIsTaskFeatureOpen(""); // Close the options after saving
        }
      } catch (error) {
        console.error("Error updating task:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else {
          console.error("Network or other error:", error.message);
        }
      }
    }
    if (dueDate) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/task/dueDate`,
          {
            taskId: selectedTaskId,
            dueDate: dueDate,
          }
        );

        if (response.status === 200) {
          setIsTaskFeatureOpen(""); // Close the options after saving
        }
      } catch (error) {
        console.error("Error updating task:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else {
          console.error("Network or other error:", error.message);
        }
      }
    }
    
  };

  const handleOpenTaskOptions = (e, name) => {
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsTaskFeatureOpen(name);
  };

  const handlelocation = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/dueDate`,
        {
          taskId: selectedTaskId,
          dueDate: dueDate,
        }
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <div
        className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => setOpenTaskOptions(false)}
      >
        <div
          className="relative text-slate-300 min-w-52 bg-gray-800 rounded-lg shadow-lg p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between pb-2 px-2">
            <div>
              <svg
                className="inline-block -ml-2 mr-2"
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5ZM19 7H5V13H19V7ZM17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16ZM6 17C5.44772 17 5 16.5523 5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6Z"
                  fill="currentColor"
                ></path>
              </svg>
              {task.name}
              <div className="ml-6">
                <span className="text-sm">
                  in list{" "}
                  <span
                    className="ml-1 px-2 pb-1 rounded"
                    style={{ backgroundColor: `${list.listColor}` }}
                  >
                    {task.listName}
                  </span>
                </span>
              </div>
            </div>
            <button className="-mt-6" onClick={() => setOpenTaskOptions(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="flex">
            <div className="w-[360px]">
              {/* {<div className="p-2 ml-6">Activity</div>} */}
            </div>

            <div className="flex flex-col  w-32 mb-4 mx-4 text-start">
              <button
                onClick={(e) => handleOpenTaskOptions(e, "date")}
                className="bg-gray-700 rounded-sm my-1 pl-3 text-start"
              >
                Dates
              </button>
              <button
                onClick={(e) => handleOpenTaskOptions(e, "label")}
                className="bg-gray-700 rounded-sm my-1 pl-3 text-start"
              >
                Label
              </button>
              <button
                onClick={(e) => handleOpenTaskOptions(e, "attachment")}
                className="bg-gray-700 rounded-sm my-1 pl-3 text-start"
              >
                Attachment
              </button>
              <button
                onClick={(e) => handleOpenTaskOptions(e, "location")}
                className="bg-gray-700 rounded-sm my-1 pl-3 text-start"
              >
                Location
              </button>
              <button className="bg-gray-700 rounded-sm my-1 pl-3 text-start">
                Delete card
              </button>
            </div>
          </div>
        </div>
      </div>

      {isTaskFeatureOpen == "date" && (
        <div
          className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-10"
          onClick={() => setIsTaskFeatureOpen("")}
        >
          <div
            className="relative text-slate-300 min-w-44 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${-180 + menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-2">
              <span className="min-w-24 text-end text-sm">Date</span>
              <button onClick={() => setIsTaskFeatureOpen("")}>
                <FontAwesomeIcon className="text-sm" icon={faTimes} />
              </button>
            </div>
            <label className="my-1 text-start">
              Add start date :
              <input
                className="block w-40 border p-1 mb-4 rounded-md bg-transparent cursor-pointer"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className=" my-1 text-start">
              Add due date :
              <input
                className="block w-40 border p-1 rounded-md bg-transparent cursor-pointer mb-3"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <label className="my-1 text-start">
              Reminder in hours :
              <input
                className="block w-20 border rounded-md bg-transparent cursor-pointer mb-3"
                type="number"
              />
            </label>
            <button
              className="block bg-gray-700 w-40 text-white px-4 py-1 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {isTaskFeatureOpen == "location" && (
        <div
          className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsTaskFeatureOpen("")}
        >
          <div
            className="relative text-slate-300 min-w-44 bg-gray-800 rounded-lg shadow-lg p-3"
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${-200 + menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-2">
              <span className="min-w-24 text-end text-sm">Location</span>
              <button onClick={() => setIsTaskFeatureOpen("")}>
                <FontAwesomeIcon className="text-sm" icon={faTimes} />
              </button>
            </div>
            <button
              onClick={handlelocation}
              className=" border hover:bg-gray-600 px-4 py-1 my-1 rounded"
            >
              Turn on Location
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListOptions;
