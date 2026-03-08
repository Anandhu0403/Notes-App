import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { createNote } from "../ApiCalls/Notesapi.js";
import { useNavigate } from "react-router";
function CreatePage() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const navigate = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      toast.error("Please fill in both the title and content fields.");
      return;
    }
    try{
        const response =createNote({title,content});
        console.log(response);
        toast.success('Note created successfully!');
        navigate('/');
    } catch (error) {
        console.error("Error creating note:", error);
        if (error.response && error.response.status === 429 ) {
            toast.error('You are being rate limited. Please try again later.');
            return;
        }
        else{
        toast.error('Failed to create note.');
        }
    }

    console.log(title, content);
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
            Create a New Note
          </h1>

          <form onSubmit={handlesubmit} className="space-y-6">

            <div>
              <label className="label">
                <span className="label-text font-medium">Note Title</span>
              </label>

              <input
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Note Content</span>
              </label>

              <textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-bordered w-full h-40"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Create Note
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default CreatePage;