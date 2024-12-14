import axios from "axios";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

const AddList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [Lists, setLists] = useState([]);

  const UserId = localStorage.getItem("userId");

  const getList = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/list/${UserId}`);
      setLists(response.data);
      console.log("Fetched lists:", response.data);
    } catch (err) {
      console.error("Error fetching lists:", err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleAddList = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/list/create", {
        name: username,
        userId: UserId,
      });
      setUsername(""); // Reset input field
      setIsAddModalOpen(false); // Close the modal
      getList(); // Refresh the lists
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <>
      <div className="w-full flex overflow-y-auto">
        {Lists.map((list) => (
          <ListItem key={list._id} list={list} getList={getList} />
        ))}
        <div className="min-w-52 text-center border rounded-md m-3">
          <div className="border p-4">Add List</div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-6xl border inline-block rounded-full p-2 m-3"
          >
            +
          </button>
        </div>
      </div>

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

            <form onSubmit={handleAddList} className="flex flex-col gap-2">
              <label>
                Name:
                <input
                  placeholder="Enter list name"
                  className="w-full border rounded p-2 outline-none bg-white"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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

export default AddList;
