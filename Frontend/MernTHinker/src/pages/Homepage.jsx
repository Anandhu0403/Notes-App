import React from 'react'
import RatelimitedUI from '../components/RatelimitedUI'
import { useState } from 'react'
import { useEffect } from 'react';
import { getNotes } from '../ApiCalls/Notesapi.js';
import { NotebookIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import { Link } from 'react-router';
function Homepage() {
        const[ratelimited,setratelimited]=useState(false);
        const[notes,setnotes]=useState([]); 
        const[loading,setloading]=useState(false);

    useEffect(()=>{

        const fetchnotes=async()=>{
            try{
               
                setloading(true);
                const response= await getNotes();
                console.log(response);
                setnotes(response);
                setratelimited(false);
                setloading(false);
            }
            catch(error){
                console.error('Error fetching notes:', error);
                if(error.response && error.response.status === 429){
                    setratelimited(true);
                }
                toast.error('Error fetching notes');
                setloading(false);
            }
        }

        fetchnotes();
    },[])
  return (
    <div>
        {ratelimited && <RatelimitedUI/>}
        {loading && <div className='text-center text-primary'>Loading...</div>}
        {!loading && notes.length === 0 && !ratelimited && (
            <div className='text-center text-primary justify-items-center align-center mt-20 items-center'>
                <NotebookIcon className='size-12 mx-auto mb-4' />
                <h2 className='text-2xl font-bold mb-2'>No Notes Found</h2>
                <p className='text-base-content/70'>Create your first note to get started!</p>
                <Link to="/create" className='btn btn-primary mt-4'>
                    Create Note
                </Link>
            </div>
        )}
        {notes.length > 0 && !ratelimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} setnote={setnotes} />
                    
                ))}
            </div>
        )}
    </div>
  )
}

export default Homepage