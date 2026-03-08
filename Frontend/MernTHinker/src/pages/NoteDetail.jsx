import React, { useState, useEffect } from "react";
import { getNoteById } from "../ApiCalls/Notesapi.js";
import { ArrowLeft } from "lucide-react";
import { Link, useParams,useNavigate } from "react-router-dom";

import{updateNote} from "../ApiCalls/Notesapi.js"
function NoteDetail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)
    const navigate=useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await getNoteById(id);
        setNote(response);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!note) {
    return <div className="text-center mt-20">Note not found</div>;
  }
  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setSaving(true)

    await updateNote(note._id, note)   
    navigate('/')

  } catch (err) {
    console.error(err)
  } finally {
    setSaving(false)
  }
}

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-center mb-8">
            Edit Note
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="label">
                <span className="label-text font-medium">Note Title</span>
              </label>

              <input
                type="text"
                value={note.title}
                onChange={(e) =>
                  setNote({ ...note, title: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Note Content</span>
              </label>

              <textarea
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
                className="textarea textarea-bordered w-full h-40"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={saving}>
               {saving && <span className="loading loading-spinner loading-sm"></span>}
                {saving ? "Saving..." : "Save Note"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default NoteDetail;