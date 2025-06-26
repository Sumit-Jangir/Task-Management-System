import React, { useState, useRef, useEffect } from "react";
import ListItem from "./ListItem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useGetLists from "../../CustomHooks/useGetLists.jsx";

const AddList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [listName, setListName] = useState("");
  const inputRef = useRef(null);

  const userId = localStorage.getItem("userId");
  const listColor = "#111827";

  // Use the custom hook
  const { lists, getLists } = useGetLists();

  useEffect(() => {
    if (isAddModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddModalOpen]);

  const handleAddList = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_KEY}/list/create`, {
        name: listName,
        userId,
        listColor,
      });
      setListName("");
      setIsAddModalOpen(false);
      getLists(); // Refresh the lists after adding
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <>
      <div className="h-[84vh] overflow-y-auto">
        <div className="flex mx-2 my-4 scrollbar-hide">
          {lists.map((list) => (
            <ListItem key={list._id} list={list} getList={getLists} />
          ))}
          <div className="min-w-64 h-fit bg-gray-900 text-white rounded-xl m-4 p-4 shadow-lg flex flex-col">
            <h3 className="border-b border-gray-700 text-lg font-semibold pb-4">
              Add List
            </h3>
            <div>
              <button
                className="block mt-3 text-sm items-center space-x-2 text-gray-400 hover:text-gray-200"
                onClick={() => setIsAddModalOpen(!isAddModalOpen)}
              >
                {!isAddModalOpen ? (
                  <span>
                    <FontAwesomeIcon icon={faPlus} />
                    <span> Add another list </span>
                  </span>
                ) : (
                  ""
                )}
              </button>

              {isAddModalOpen && (
                <form onSubmit={handleAddList} className="flex flex-col">
                  <input
                    ref={inputRef}
                    className="w-full border border-gray-600 rounded-md p-2 mt-2 outline-none bg-gray-700/50 text-white placeholder-gray-400 focus:border-[#fcfcfc] transition-colors"
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="Enter list name"
                  />

                  <div className="mt-2">
                    <button
                      type="submit"
                      className="bg-gray-700 hover:bg-gray-800 w-24 text-white uppercase px-4 py-1.5 rounded-md transition-colors"
                    >
                      Save
                    </button>

                    <span
                      className="text-gray-400 hover:text-gray-200 cursor-pointer text-2xl font-bold px-2 ml-2"
                      onClick={() => setIsAddModalOpen(false)}
                    >
                      &times;
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddList;
