import {toast} from 'react-hot-toast'
import { Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import NoteDetail from './pages/NoteDetail'
import CreatePage from './pages/CreatePage'
function App() {
  

  return (
    <>
    <Navbar/>
      <Routes>
        
        <Route path="/" element={<Homepage/>}/>
        <Route path="/note/:id" element={<NoteDetail/>}/>
        <Route path="/create" element={<CreatePage/>}/>
      </Routes>
    </>
  )
}

export default App
