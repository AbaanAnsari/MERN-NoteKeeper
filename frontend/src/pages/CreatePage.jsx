import axiosInstance from "../lib/axios.js"
import toast from "react-hot-toast"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { ArrowLeftIcon } from "lucide-react"

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim() || !description.trim()) {
    toast.error("All fields are required");
    return;
  }

  setLoading(true);

  try {
    await axiosInstance.post("/notes", {
      title,
      description,
    });

    toast.success("Note created successfully");
    navigate("/");
  } catch (error) {
    if (error.response.status === 429) {
      toast.error(
        "Too many requests. Please wait a moment before creating another note.",
        { duration: 4000, icon: "⏳" }
      );
    } else {
      toast.error("Failed to create note");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="max-w-2l mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a New Note</h2>

              <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-lg">Title</span>
                  </label>
                  <input
                    type="text" placeholder="Enter your note title"
                    className="input input-bordered"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-lg">Description</span>
                  </label>
                  <textarea placeholder="Write your note here..."
                    className="textarea textarea-bordered min-h-[160px] resize-none"
                    value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="flex justify-end">
                  <button type="submit" disabled={loading} className="btn btn-primary px-6 transition-all duration-300">
                    {loading ? (<span className="loading loading-spinner"></span>) : ("Create Note")}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default CreatePage