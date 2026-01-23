import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import RateLimiterAlert from "../components/RateLimiterUI";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";

import api from "../lib/axios";
import toast from "react-hot-toast";

/* ---------------- Motion Variants ---------------- */

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const grid = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <AnimatePresence mode="wait">

          {/* 1️⃣ LOADING – nothing else renders */}
          {loading && (
            <motion.div
              key="loading"
              variants={fade}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center text-primary py-16"
            >
              Loading notes...
            </motion.div>
          )}

          {/* 2️⃣ AFTER LOADING */}
          {!loading && (
            <>
              {isRateLimited && (
                <motion.div
                  key="rate-limit"
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                >
                  <RateLimiterAlert />
                </motion.div>
              )}

              {!isRateLimited && notes.length === 0 && (
                <motion.div
                  key="empty"
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                >
                  <NotesNotFound />
                </motion.div>
              )}

              {!isRateLimited && notes.length > 0 && (
                <motion.div
                  key="notes"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={grid}
                  initial="hidden"
                  animate="visible"
                >
                  {notes.map((note) => (
                    <motion.div key={note._id} variants={card}>
                      <NoteCard note={note} setNotes={setNotes} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;
