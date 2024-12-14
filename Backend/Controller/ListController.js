import listSchema from "../Model/listSchema.js";
import dotenv from "dotenv";

dotenv.config();

export const create = async (req, res) => {
    try {
        const { name, userId } = req.body;
        const response = await listSchema.create({ name, user: userId });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getListsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const lists = await listSchema.find({ user: userId });
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };