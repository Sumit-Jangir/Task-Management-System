import mongoose from "mongoose";

const task = mongoose.Schema({
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  listName: {
    type: String,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lists",
    required: true,
  },
  userId: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
});

const taskSchema = mongoose.model("Task", task);

export default taskSchema