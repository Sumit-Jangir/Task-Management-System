// Controller/TaskController.js

import mongoose from 'mongoose';  // Add this import
import taskSchema from '../Model/taskSchema.js';
import listSchema from '../Model/listSchema.js';  // Add this if you haven't already

export const createTask = async (req, res) => {
    const { name, listId } = req.body;
    try {

      const list = await listSchema.findById(listId);
      if (!list) {
        return res.status(404).json({ error: "List not found" });
      }

      const task = await taskSchema.create({ name, listId });
      res.status(200).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: error.message });
    }
};

export const getTasksForList = async (req, res) => {
    const { listId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(listId)) {
            return res.status(400).json({ error: "Invalid listId" });
        }

        const tasks = await taskSchema.find({ listId });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found for this list" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks." });
    }
};
