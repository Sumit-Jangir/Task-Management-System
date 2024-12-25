import express from 'express'
import VerifyToken from '../middleware/VerifyToken.js';
import { addDueDate, createTask, getAllTasks, getTasksForList, updateTask } from '../Controller/TaskController.js';

const route = express.Router();

route.post("/create", createTask);
route.post("/dueDate", addDueDate);
route.post("/allTask", getAllTasks);
route.get("/:listId", getTasksForList);
route.put("/update/:taskId", updateTask);
// route.post('/create', create )
// route.get("/:userId", getListsByUser);

export default route;