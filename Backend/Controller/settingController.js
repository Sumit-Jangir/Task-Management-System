import SettingModel from "../Model/settingModel.js";

export const createAddUpdateNavList = async (req, res) => {
  try {
    const { userId, navList } = req.body;

    // if (!Array.isArray(navList)) {
    //   return res.status(400).json({ error: "navList must be an array" });
    // }

    const result = await SettingModel.findOneAndUpdate(
      { userId },
      { navList },
      { new: true, upsert: true } // Return updated doc, create if not found
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNavList = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await SettingModel.find({ userId });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
