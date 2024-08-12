import express from "express";
import { createAccount, Login } from "../Controller/RegisterController.js";
import authenticateToken from "../utilities.js";
import {
  AddNote,
  DeleteNote,
  EditNote,
  GetAllNotes,
  UpdatePinned,
} from "../Controller/NoteController.js";
import { GetUsers } from "../Controller/UserController.js";
const router = express.Router();
router.route("/create-account").post(createAccount);
router.route("/login").post(Login);
router.route("/add-note").post(authenticateToken, AddNote);
router.route("/edit-note/:noteID").put(authenticateToken, EditNote);
router.route("/get-all-notes").get(authenticateToken, GetAllNotes);
router.route("/delete-note/:noteID").delete(authenticateToken, DeleteNote);
router
  .route("/update-note-pinned/:noteID")
  .put(authenticateToken, UpdatePinned);
router.route("/get-user").get(authenticateToken, GetUsers);
export default router;
