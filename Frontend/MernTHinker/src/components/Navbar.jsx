import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { NotebookIcon } from 'lucide-react'
function Navbar() {
  return (
    <div>
        <header className='bg-base-300 border-b border-base-content/10'>
            <div className='mx-auto max-w-7xl p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-row items- align-middle gap-2'>
               <NotebookIcon className='size-8 mx-auto mb-4 text-primary' />  <h1 className='text-2xl font-bold text-primary'>Notes App</h1>
                 </div>
                 <Link to="/create" className='btn btn-primary'>
                    <PlusIcon />
                    Create Note
                 </Link>
            </div>
            </div>
        </header>   
    </div>
  )
}

export default Navbar