import { useNavigate, useParams } from "react-router";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const LogoutConfirm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleConfirmLogout = async () => {
        try {
            await axiosInstance.post("/users/logout");
            toast.success("LogOut Successfully");
            navigate("/login", { replace: true });
        } catch (error) {
            toast.error("Failed to logout");
            navigate(-1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-sm rounded-xl bg-base-100 p-6 shadow-xl">
                <h3 className="text-lg font-semibold">Delete Note</h3>

                <p className="mt-2 text-sm text-base-content/70">
                    This action cannot be undone. Are you sure you want LogOut?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button className="btn btn-ghost" onClick={() => navigate(-1)}>
                        Cancel
                    </button>

                    <button className="btn btn-error" onClick={handleConfirmLogout}>
                        LogOut
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirm;
