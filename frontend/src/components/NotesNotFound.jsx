import { Link } from "react-router";
import { NotebookIcon } from "lucide-react";
import { motion } from "framer-motion";

/* ---------------- Motion Variants ---------------- */

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const icon = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const buttonTap = {
  tap: { scale: 0.95 },
};

/* ---------------- Component ---------------- */

const NotesNotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
          variants={icon}
        >
          <NotebookIcon className="size-10 text-primary" />
        </motion.div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-base-content">
          No Notes Found
        </h2>

        <p className="mt-2 text-base-content/70">
          You haven’t created any notes yet. Start by adding your first note.
        </p>

        {/* Action */}
        <div className="mt-6">
          <motion.div whileTap="tap" variants={buttonTap}>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5
                         text-primary-content transition-transform"
            >
              Create Your First Note
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotesNotFound;
