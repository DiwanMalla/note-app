import express from "express";
import { createAccount, Login } from "../Controller/RegisterController.js";
import authenticateToken from "../utilities.js";
import {
  AddNote,
  DeleteNote,
  EditNote,
  GetAllNotes,
} from "../Controller/NoteController.js";
const router = express.Router();
router.route("/create-account").post(createAccount);
router.route("/login").post(Login);
router.route("/add-note").post(authenticateToken, AddNote);
router.route("/edit-note/:noteID").put(authenticateToken, EditNote);
router.route("/get-all-notes").get(authenticateToken, GetAllNotes);
router.route("/delete-note/:noteID").delete(authenticateToken, DeleteNote);
export default router;
