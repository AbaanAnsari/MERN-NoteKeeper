import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

/* ---------------- Motion Variants ---------------- */

const pageFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0 },
};

const cardSlide = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const buttonTap = {
  tap: { scale: 0.97 },
};

/* ---------------- Component ---------------- */

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = () => {
    navigate(`/confirm/delete-note/${id}`);
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.description.trim()) {
      toast.error("Please add a title or description");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* ---------- Loading ---------- */}
      {loading && (
        <motion.div
          key="loader"
          className="min-h-screen bg-base-200 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoaderIcon className="animate-spin size-10" />
        </motion.div>
      )}

      {/* ---------- Content ---------- */}
      {!loading && note && (
        <motion.div
          key="content"
          className="min-h-screen bg-base-200"
          variants={pageFade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon className="size-5" />
                  Back to Notes
                </Link>

                <motion.button
                  className="btn btn-error btn-outline"
                  onClick={handleDelete}
                  whileTap="tap"
                  variants={buttonTap}
                >
                  <Trash2Icon className="size-5" />
                  Delete Note
                </motion.button>
              </div>

              <motion.div
                className="card bg-base-100"
                variants={cardSlide}
                initial="hidden"
                animate="visible"
              >
                <div className="card-body">
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered"
                      value={note.title}
                      onChange={(e) =>
                        setNote({ ...note, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-[260px]"
                      value={note.description}
                      onChange={(e) =>
                        setNote({ ...note, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <motion.button
                      className="btn btn-primary"
                      disabled={saving}
                      onClick={handleSave}
                      whileTap="tap"
                      variants={buttonTap}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteDetailPage;
