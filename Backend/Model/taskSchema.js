import mongoose from "mongoose";

const task = mongoose.Schema({
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lists",
    required: true,
  },
});

const taskSchema = mongoose.model("Task", task);

export default taskSchema