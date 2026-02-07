import { Link, replace, useNavigate } from "react-router";
import { useState } from "react";
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../lib/helper";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { fetchUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        // validation
        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        if (!password) {
            setError("Password is required");
            return;
        }

        try {
            setLoading(true);

            await axiosInstance.post("/users/login", {
                email,
                password,
            });
            await fetchUser();

            toast.success("Login successful");
            navigate("/", { replace: true });

        } catch (error) {
            console.log("LOGIN ERROR:", error);

            const status = error.response?.status;
            const message = error.response?.data?.message;

            if (status === 429) {
                toast.error("Too many requests. Please try again later.", {
                    duration: 4000,
                    icon: "⏳",
                });
            } else if (status === 404) {
                toast.error(message || "User not found");
            } else if (status === 401) {
                toast.error(message || "Invalid password");
            } else {
                toast.error("Server unreachable. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-bold text-center mb-6 text-primary">
                    NoteKeeper
                </h1>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl justify-center">
                            Welcome Back
                        </h2>

                        <form onSubmit={handleLogin} className="space-y-4 mt-4">

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="input input-bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password */}
                            <PasswordInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && (
                                <p className="text-red-500 text-xs">{error}</p>
                            )}

                            {/* Submit */}
                            <button className="btn btn-primary w-full">
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>

                        <p className="text-center text-sm mt-4">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Sign up
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
