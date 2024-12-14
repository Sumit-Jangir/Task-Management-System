import { useState } from "react";
import "./App.css";
import SignUp from "./Components/SignUp.jsx";
import Header from "./Components/Header.jsx";
import { BrowserRouter, Navigate, Outlet, Route, Router, Routes } from "react-router-dom";
import Login from "./Components/Login.jsx";
import AddList from "./Components/AddList.jsx";

function App() {
  const useAuth = () => {
    const token = localStorage.getItem("token");
    // setUserDetails(true)
    return token;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<AddList />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import { useState } from 'react';
// // import { Column } from './Column';
// import { DndContext } from '@dnd-kit/core';
// import { Column } from './Column';

// const COLUMNS = [
//   { id: 'TODO', title: 'To Do' },
//   { id: 'IN_PROGRESS', title: 'In Progress' },
//   { id: 'DONE', title: 'Done' },
// ];

// const INITIAL_TASKS = [
//   {
//     id: '1',
//     title: 'Research Project',
//     description: 'Gather requirements and create initial documentation',
//     status: 'TODO',
//   },
//   {
//     id: '2',
//     title: 'Design System',
//     description: 'Create component library and design tokens',
//     status: 'TODO',
//   },
//   {
//     id: '3',
//     title: 'API Integration',
//     description: 'Implement REST API endpoints',
//     status: 'IN_PROGRESS',
//   },
//   {
//     id: '4',
//     title: 'Testing',
//     description: 'Write unit tests for core functionality',
//     status: 'DONE',
//   },
// ];

// export default function App() {
//   const [tasks, setTasks] = useState(INITIAL_TASKS);

//   function handleDragEnd(event) {
//     const { active, over } = event;

//     if (!over) return;

//     const taskId = active.id;
//     const newStatus = over.id;

//     setTasks(() =>
//       tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               status: newStatus,
//             }
//           : task,
//       ),
//     );
//   }

//   return (
//     <div className="p-4">
//       <div className="flex gap-8">
//         <DndContext onDragEnd={handleDragEnd}>
//           {COLUMNS.map((column) => {
//             return (
//               <Column
//                 key={column.id}
//                 column={column}
//                 tasks={tasks.filter((task) => task.status === column.id)}
//               />
//             );
//           })}
//         </DndContext>
//       </div>
//     </div>
//   );
// }
