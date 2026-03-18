import { Router } from "express";
import { createNote ,getNotes,deleteNote,updateNote,getNoteById,pinnote} from "../controllers/notes.controller.js";
const router=Router()

router.route('/create').post(createNote)
router.route('/getnotes').get(getNotes) 
router.route('/delete/:id').delete(deleteNote)
router.route('/update/:id').put(updateNote)
router.route('/:id').get(getNoteById)
router.route('/pin/:id').post(pinnote)
export default router