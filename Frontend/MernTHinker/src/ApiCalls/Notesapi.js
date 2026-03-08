import axios from "axios";

export const createNote = async (noteData) => {
  try {
    const response = await axios.post('http://localhost:4000/api/v1/notes/create', noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  } 
};

export const getNotes = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/notes/getnotes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};
export const deleteNote=async (id)=>{
    try{
        const res=await axios.delete(`http://localhost:4000/api/v1/notes/delete/${id}`);
        return res.data;

    }
    catch(error){
        console.error('Error deleting note:', error);
        throw error;
    }

}
export const updateNote=async (id,noteData)=>{
    try{
        const res=await axios.put(`http://localhost:4000/api/v1/notes/update/${id}`,noteData);
        return res.data;    
    }
    catch(error){
        console.error('Error updating note:', error);
        throw error;
    }
}
export const getNoteById=async (id)=>{
    try{
        const res=await axios.get(`http://localhost:4000/api/v1/notes/${id}`); 
        return res.data;
    }
    catch(error){   
        console.error('Error fetching note:', error);
        throw error;
    }
} 