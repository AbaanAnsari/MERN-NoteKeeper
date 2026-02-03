import Note from "../models/Note.js";


//Fetching the notes
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });  //sort({ createdAt: -1 }) to get latest notes first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Fetching a note by ID(fetching a specific single note)
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Fetched NoteByID successfully", note: note });
  } catch (error) {
    console.error("Error in getNoteByID Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Creating a note
export async function createNote(req, res) {
  try {
    const { title, description } = req.body;

    const note = new Note({ title, description });

    const savedNote = await note.save();
    res.status(201).json({ message: "Note Created successfully", note: savedNote });
  } catch (error) {
    console.error("Error in createNote Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Updating a note
export async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, description }, { new: true });

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ messsage: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error in updateNote Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Deleting a note
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ messsage: "Note deleted successfully" })
  } catch (error) {
    console.error("Error in deleteNote Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};