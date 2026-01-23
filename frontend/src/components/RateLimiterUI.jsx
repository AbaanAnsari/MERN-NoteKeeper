import { motion, AnimatePresence } from "framer-motion";

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
    y: 12,
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
    scale: 0.95,
    y: 8,
    transition: { duration: 0.2 },
  },
};

const pulse = {
  animate: {
    scale: [1, 1.08, 1],
    transition: {
      duration: 1.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ---------------- Component ---------------- */

const RateLimitAlert = () => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
        />

        {/* Alert Card */}
        <motion.div
          className="relative w-[520px] max-w-[92vw] rounded-2xl border border-red-500/30 bg-red-950 shadow-2xl"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex gap-5 p-6">
            {/* Icon */}
            <motion.div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-lg"
              variants={pulse}
              animate="animate"
            >
              ⛔
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-red-100">
                Too Many Requests
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-red-300">
                You’ve exceeded the allowed request rate. Please wait a moment
                before retrying.
              </p>

              <div className="mt-5">
                <span className="text-sm text-red-400">
                  Retry in a few seconds
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RateLimitAlert;
