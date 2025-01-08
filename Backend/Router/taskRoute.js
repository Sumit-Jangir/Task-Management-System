import express from "express";
import VerifyToken from "../middleware/VerifyToken.js";
import {
  addDueDate,
  addStartDate,
  createTask,
  deleteTask,
  getAllTasks,
  getLocation,
  getTasksFromList,
  getTasksWithDueDate,
  setLocation,
  updateTask,
  updateTaskColor,
} from "../Controller/TaskController.js";

const route = express.Router();

route.post("/create", createTask);
route.post("/dueDate", addDueDate);
route.post("/startDate", addStartDate);
route.post("/setLocation", setLocation);
route.post("/getLocation", getLocation);
route.put("/updateTaskColor", updateTaskColor);
route.post("/getdueDateTask", getTasksWithDueDate);
route.post("/allTask", getAllTasks);
route.get("/:listId", getTasksFromList);
route.put("/update/:taskId", updateTask);
route.post("/deleteTask",deleteTask)

export default route;
