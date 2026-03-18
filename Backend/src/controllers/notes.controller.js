import { Note } from "../models/notes.js";

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error: error.message })
    }
}
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({  pinned: -1,createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error: error.message })
    }
}
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error: error.message });
    }
}
const updateNote = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body cannot be empty' });
        }
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error: error.message });
    }
}
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching note', error: error.message });
    }
}
const pinnote = async (req, res) => {
    try{

        const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

       
        note.pinned = !note.pinned;

        
        await note.save();

        return res.status(200).json({
            message: note.pinned ? "Note pinned" : "Note unpinned",
            note
        });
    
    }
    catch{

    }
    

}
export { createNote, getNotes, deleteNote, updateNote, getNoteById,pinnote } 