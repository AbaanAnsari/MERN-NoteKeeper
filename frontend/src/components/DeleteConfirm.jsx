import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-base-100 p-6 shadow-xl">
        <h3 className="text-lg font-semibold">Delete Note</h3>

        <p className="mt-2 text-sm text-base-content/70">
          This action cannot be undone. Are you sure you want to delete this
          note?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            Cancel
          </button>

          <button className="btn btn-error" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
