import { Router } from "express";
import { createNote ,getNotes,deleteNote,updateNote,getNoteById} from "../controllers/notes.controller.js";
const router=Router()

router.route('/create').post(createNote)
router.route('/getnotes').get(getNotes) 
router.route('/delete/:id').delete(deleteNote)
router.route('/update/:id').put(updateNote)
router.route('/:id').get(getNoteById)
export default router