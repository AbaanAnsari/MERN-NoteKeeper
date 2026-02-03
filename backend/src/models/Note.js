// Setting a MongoDB Database for storing notes
import mongoose from "mongoose";

// 1st step: Create a schema
// 2nd step: Create a model for that schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

},
    { timestamps: true } //createdAt and updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;