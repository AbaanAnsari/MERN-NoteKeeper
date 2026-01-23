import { Link, useNavigate } from "react-router";
import { Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "../lib/utils.js";

/* ---------------- Motion Variants ---------------- */

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const hoverLift = {
  hover: {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const tap = {
  tap: { scale: 0.96 },
};

/* ---------------- Component ---------------- */

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.preventDefault();   // stop Link navigation
    e.stopPropagation();  // stop bubbling to card
    navigate(`/confirm/delete-note/${id}`);
  };

  return (
    <motion.div
      variants={card}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <motion.div
        whileHover="hover"
        variants={hoverLift}
        className="h-full"
      >
        <Link
          to={`/note/${note._id}`}
          className="card bg-base-100 drop-shadow-xl border-t-4 border-[#5e81ac] h-56"
        >
          <div className="card-body">
            <h3 className="card-title">{note.title}</h3>

            <p className="text-base-content/70 line-clamp-3">
              {note.description}
            </p>

            <div className="card-actions justify-between items-center mt-4">
              <span className="text-sm text-base-content/60">
                {formatDate(new Date(note.createdAt))}
              </span>

              <motion.button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
                whileTap="tap"
                variants={tap}
              >
                <Trash2Icon className="size-4" />
              </motion.button>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NoteCard;
