import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon,Star } from 'lucide-react'
import { toast } from 'react-hot-toast';
// import { formatDate } from "../lib/utils";
import { deleteNote } from '../ApiCalls/Notesapi.js';
import {pinNote} from '../ApiCalls/Notesapi.js';
function NoteCard({ note, setnote }) {

  function handleDelete(e, id) {
    e.preventDefault();
    const res = window.confirm('Are you sure you want to delete this note?')
    if (!res) {
      return;
    }
    else {
      try {
        const response = deleteNote(id);
        console.log(response);
        toast.success('Note deleted successfully!');
        setnote(prevNotes => prevNotes.filter(note => note._id !== id));
      }
      catch (error) {
        console.error('Error deleting note:', error);
        toast.error('Failed to delete note.');
      }
    }


  }
  async function  handlepin(e,id){
    e.preventDefault();
    const response= await pinNote(id);
    toast.success(`${response.data.message}`)
    setnote((prevNotes) =>
    prevNotes.map((note) =>
      note._id === id
        ? { ...note, pinned: !note.pinned }
        : note
    )
  );


  }
  return (
    <Link to={`/note/${note._id}`} className='border border-base-content/10 rounded-lg p-4 hover:bg-base-100 transition'>
      <div className='card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]'>
        <div className='card-body'>
          <h2 className='card-title text-base'>{note.title}</h2>
          <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {/* {formatDate(new Date(note.createdAt))} */}
            </span>
            <div className="flex items-center gap-1">
              <button 
              className="btn btn-ghost btn-xs text-warning"
              onClick={(e)=>handlepin(e,note._id)}
              >
               { note.pinned? <Star fill="#FFD700" strokeWidth={0} />:<Star />  }
              </button>

              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard