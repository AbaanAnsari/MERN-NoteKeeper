import express from "express"
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from "../controllers/notesController.js";
import authenticateToken from "../middleware/authorization.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);



export default router;


