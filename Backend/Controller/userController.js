import userModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.secretKey

export const signUp = async (req, res) => {
  try {
    const { name, email, password, conformPassword } = req.body;

    if (!(name && email && password && conformPassword)) {
      return res.status(404).json({ message: "All field are require" });
    }

    if (password != conformPassword) {
      return res.status(404).json({ message: "Incoreect Password" });
    }
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data = {
      name,
      email,
      password: hash,
    };

    user = new userModel(data);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found! Please signup" });
    }
    const dbPassword = user.password;

    const matchData = await bcrypt.compare(password, dbPassword);

    console.log("<<<<<match>>>>>", matchData);
    if (!matchData) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      secretKey,
      {expiresIn:"1h"}
    );

    console.log("<<<<<token>>>>>>", token);

    return res.status(200).json({ token,_id:user._id, message: "user login successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
