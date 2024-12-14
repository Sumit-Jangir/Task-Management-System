// import { useDroppable } from '@dnd-kit/core';
// import { TaskCard } from './TaskCard';
// // import { TaskCard } from './TaskCard';

// export function Column({ column, tasks }) {
//   const { setNodeRef } = useDroppable({
//     id: column.id,
//   });

//   return (
//     <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
//       <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
//       <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
//         {tasks.map((task) => {
//           return <TaskCard key={task.id} task={task} />;
//         })}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import './Display.css';
// import axios from 'axios';

// const Display = () => {
//   const [addInput, setAddInput] = useState(false); // Toggle add list input
//   const [activeListId, setActiveListId] = useState(null); // Track active list for adding a task
//   const [listName, setListName] = useState(''); // New list name
//   const [taskName, setTaskName] = useState(''); // New task name
//   const [lists, setLists] = useState([]); // Fetched lists

//   // Fetch user-specific lists
//   const getApi = async () => {
//     const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
//     if (!userId) {
//       console.error('User ID not found.');
//       return;
//     }

//     try {
//       const response = await axios.get(http://localhost:8080/list/${userId});
//       setLists(response.data); // Update state with fetched lists
//     } catch (error) {
//       console.error('Error fetching lists:', error);
//     }
//   };

//   // Call getApi on component mount
//   useEffect(() => {
//     getApi();
//   }, []);

//   // Function to create a new list
//   const handleSaveList = async () => {
//     const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
//     if (!userId || !listName) {
//       alert('User ID or List Name is missing.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:8080/list/create', {
//         name: listName,
//         userId: userId,
//       });
//       alert('List has been created');
//       setListName('');
//       setAddInput(false);
//       getApi(); // Refresh lists
//     } catch (error) {
//       console.error('Error creating list:', error);
//     }
//   };

//   // Function to save a task to a specific list
//   const handleSaveTask = async (listId) => {
//     if (!taskName) {
//       alert('Task name cannot be empty.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:8080/task/create', {
//         name: taskName,
//         listId: listId,
//       });
//       alert('Task added successfully!');
//       setTaskName(''); // Clear the task input
//       setActiveListId(null); // Close the input for tasks
//       getApi(); // Refresh lists
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   // Handle opening task input for a specific list
//   const handleAddTask = (listId) => {
//     setActiveListId(activeListId === listId ? null : listId); // Toggle active list
//   };

//   return (
//     <>
//       <button className="AddList" onClick={() => setAddInput(true)}>
//         Add List
//       </button>

//       {addInput && (
//         <div>
//           <input
//             placeholder="Add List Name"
//             value={listName}
//             onChange={(e) => setListName(e.target.value)}
//           />
//           <button onClick={handleSaveList}>Save</button>
//         </div>
//       )}

//       <h3>Your Lists:</h3>
//       {lists.length > 0 ? (
//         <div className="lists-container">
//           {lists.map((list) => (
//             <div key={list.id} className="list-item">
//               <h4>{list.name}</h4>
//               <button onClick={() => handleAddTask(list.id)}>Add Task</button>

//               {/* Only show task input for the active list */}
//               {activeListId === list.id && (
//                 <div>
//                   <input
//                     placeholder="Add Task"
//                     value={taskName}
//                     onChange={(e) => setTaskName(e.target.value)}
//                   />
//                   <button onClick={() => handleSaveTask(list.id)}>Save Task</button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No lists found.</p>
//       )}
//     </>
//   );
// };

// export default Display;
