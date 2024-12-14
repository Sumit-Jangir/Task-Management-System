import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ListModel = mongoose.model("lists", listSchema);

export default ListModel; // Correctly export the model
