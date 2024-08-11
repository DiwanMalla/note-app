import express from "express";
import {
  AddNote,
  createAccount,
  Login,
} from "../Controller/RegisterController.js";
import authenticateToken from "../utilities.js";
const router = express.Router();
router.route("/create-account").post(createAccount);
router.route("/login").post(Login);
router.route("/add-note").post(authenticateToken, AddNote);

export default router;
