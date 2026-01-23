const RateLimitAlert = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

      {/* Alert Card */}
      <div className="relative w-[520px] max-w-[92vw] rounded-2xl border border-red-500/30 bg-red-950 shadow-2xl animate-scaleIn">
        <div className="flex gap-5 p-6">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-lg animate-pulseSlow">
            ⛔
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-base font-semibold text-red-100">
              Too Many Requests
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-red-300">
              You’ve exceeded the allowed request rate. Please wait a moment before retrying.
            </p>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-red-400">
                Retry in few seconds
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-pulseSlow {
          animation: pulseSlow 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RateLimitAlert;
