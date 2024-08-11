import UserModel from "../models/user_models.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import NoteModel from "../models/note_models.js";
dotenv.config();
export const createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName && fullName === "") {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await UserModel.findOne({ email: email });
  if (isUser) {
    return res.json({
      error: true,
      message: "User Already exist",
    });
  }
  const user = new UserModel({
    fullName,
    email,
    password,
  });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });
  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Succesfull",
  });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "Password is required",
    });
  }
  const userInfo = await UserModel.findOne({ email: email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Login Successfully",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Info",
    });
  }
};

export const AddNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }
  if (!tag) {
    return res.status(400).json({ error: true, message: "Tag is required" });
  }
  try {
    const note = new NoteModel({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: true, message: "Internal server error" });
  }
};
