import { Link } from "react-router"
import { NotebookIcon } from "lucide-react";

const NotesNotFound = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in-up">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <NotebookIcon className="size-10 text-primary" />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-base-content">
          No Notes Found
        </h2>
        <p className="mt-2 text-base-content/70">
          You haven’t created any notes yet. Start by adding your first note.
        </p>

        {/* Action */}
        <div className="mt-6">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5
                       text-primary-content transition-all duration-300
                       hover:scale-105 active:scale-95"
          >
            Create Your First Note
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotesNotFound;
