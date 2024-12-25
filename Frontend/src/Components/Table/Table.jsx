import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [taskItem, setTaskItem] = useState([]);
  const userId = localStorage.getItem("userId");

  const getAllTask = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/task/allTask`,
        {
          userId,
        }
      );
      setTaskItem(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllTask();
  },[setTaskItem]);

  return (
    <div className="min-h-[88vh] bg-gray-800 text-white m-4 rounded-t-md">
      <div className=" flex justify-center p-4">
        <table className="table-auto w-full ">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">List</th>
              <th className="px-4 py-2 text-left">Labels</th>
              <th className="px-4 py-2 text-left">Due date</th>
            </tr>
          </thead>
          <tbody>
            {taskItem.map((item, index) => (
              <tr key={index} className="border-b border-gray-600">
                <td className=" px-4 py-2">{item.name}</td>
                <td className=" px-4 py-2">{item.listName}</td>
                {/* <td className=" px-4 py-2">
                  <div className="flex space-x-2">
                    {item.labels.map((label, i) => (
                      <span
                        key={i}
                        className={`h-4 w-4 rounded-full ${getLabelColor(
                          label
                        )}`}
                      ></span>
                    ))}
                  </div>
                </td>
                <td className=" px-4 py-2">{item.dueDate}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
