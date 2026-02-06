
import { Link, useNavigate } from "react-router";
import PasswordInput from "../components/input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../lib/helper";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        if (!password) {
            setError("Invalid password");
            return;
        }
        try {
            setLoading(true);

            const res = await axiosInstance.post("/users/login", {
                email,
                password,
            });

            // Backend returns: { user, accessToken, refreshToken }
            const { user } = await res.data;

            // Save user in global state / context / redux
            setUser(user);

            toast.success("Login successful");
            navigate("/");

        } catch (error) {
            console.log("LOGIN ERROR:", error);

            const status = error.response?.status;
            const message = error.response?.data?.message;

            if (status === 429) {
                toast.error("Too many requests. Please try again later.", {
                    duration: 4000,
                    icon: "⏳",
                });
            }
            else if (status === 404) {
                toast.error(message || "User not found");
            }
            else if (status === 401) {
                toast.error(message || "Invalid password");
            }
            else {
                // network / CORS / server down
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

                            <PasswordInput value={password}
                                onChange={(e) => setPassword(e.target.value)} />

                            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                            <button className="btn btn-primary w-full">
                                {loading ? (<span className="loading loading-spinner"></span>) : ("Login")}
                            </button>
                        </form>

                        <p className="text-center text-sm mt-4">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="link link-primary"
                            >
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
