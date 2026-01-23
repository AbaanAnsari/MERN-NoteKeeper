import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";

/* ---------------- Motion Variants ---------------- */

const navFade = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const buttonTap = {
  tap: { scale: 0.95 },
};

/* ---------------- Component ---------------- */

const Navbar = () => {
  return (
    <motion.header
      className="bg-base-300 border-b border-base-content/10"
      variants={navFade}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
            NoteKeeper
          </h1>

          {/* Actions */}
          <motion.div whileTap="tap" variants={buttonTap}>
            <Link
              to="/create"
              className="btn btn-primary rounded-xl gap-2"
            >
              <PlusIcon className="size-5" />
              <span className="hidden sm:inline">New Note</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
