import express from 'express'
import VerifyToken from '../middleware/VerifyToken.js';
import { addDueDate, addStartDate, createTask, getAllTasks, getLocation, getTasksForList, getTasksWithDueDate, setLocation, updateTask } from '../Controller/TaskController.js';

const route = express.Router();

route.post("/create", createTask);
route.post("/dueDate", addDueDate);
route.post("/startDate", addStartDate);
route.post("/setLocation", setLocation);
route.post("/getLocation", getLocation);
route.post("/getdueDateTask", getTasksWithDueDate);
route.post("/allTask", getAllTasks);
route.get("/:listId", getTasksForList);
route.put("/update/:taskId", updateTask);

export default route;