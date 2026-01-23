import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import api from "../lib/axios";
import toast from "react-hot-toast";

/* ---------------- Motion Variants ---------------- */

const overlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const modal = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.2 },
  },
};

const tap = {
  tap: { scale: 0.96 },
};

/* ---------------- Component ---------------- */

const DeleteConfirm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Failed to delete note");
      navigate(-1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        variants={overlay}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          onClick={() => navigate(-1)}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-sm rounded-xl bg-base-100 p-6 shadow-xl"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h3 className="text-lg font-semibold">Delete Note</h3>

          <p className="mt-2 text-sm text-base-content/70">
            This action cannot be undone. Are you sure you want to delete this
            note?
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <motion.button
              className="btn btn-ghost"
              onClick={() => navigate(-1)}
              whileTap="tap"
              variants={tap}
            >
              Cancel
            </motion.button>

            <motion.button
              className="btn btn-error"
              onClick={handleConfirmDelete}
              whileTap="tap"
              variants={tap}
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirm;
