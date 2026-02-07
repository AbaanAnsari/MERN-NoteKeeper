
import { Link } from "react-router";
import { LogOut, PlusIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, loadingUser } = useAuth();

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
            NoteKeeper
          </h1>
          <div className="flex items-center gap-4">

            {/* Create Button */}
            <div className="flex items-center gap-3">
              <Link
                to="/create"
                className="btn btn-primary rounded-xl gap-2"
              >
                <PlusIcon className="size-5" />
                <span className="hidden sm:inline">New Note</span>
              </Link>
            </div>

            {/* Logout Button */}
            <div className="flex items-center">
              <Link
                to="/confirm/logout"
                className="btn btn-primary rounded-xl gap-2"
              >
                <LogOut className="size-5" />
                <span>{user.fullName}</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
