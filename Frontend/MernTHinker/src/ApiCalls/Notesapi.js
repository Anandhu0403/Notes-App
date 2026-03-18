import axios from "axios";
const API_BASE = import.meta.env.DEV
  ? "http://localhost:4000/api/v1"
  : "/api/v1";
export const createNote = async (noteData) => {
  try {
    const response = await axios.post(`${API_BASE}/notes/create`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE}/notes/getnotes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};
export const deleteNote = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/notes/delete/${id}`);
    return res.data;

  }
  catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }

}
export const updateNote = async (id, noteData) => {
  try {
    const res = await axios.put(`${API_BASE}/notes/update/${id}`, noteData);
    return res.data;
  }
  catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
}
export const getNoteById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/notes/${id}`);
    return res.data;
  }
  catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
} 
export const pinNote=async (id)=> {
  try{
    const res=await axios.post(`${API_BASE}/notes/pin/${id}`)
    return res;
  }
  catch (error){
      {
    console.error('Error fetching note:', error);
    throw error;

  }
  }
}