import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Cherry, Mail, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const apiBaseUrl = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/auth/login`, 
                { email, password },
                { withCredentials: true }
            );
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/recipe");

        } catch (err) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans flex items-center justify-center bg-slate-100">
            <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
                
                {/* --- Left Panel: Visual & Brand Story --- */}
                <div className="relative w-full md:w-1/2 p-10 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                    {/* Background decorative shapes */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-lg animate-pulse animation-delay-2000"></div>

                    <div className="relative z-10 text-center animate-fade-in-down">
                        <Cherry size={120} strokeWidth={1.5} className="mx-auto mb-4 drop-shadow-lg" />
                        <h1 className="text-5xl font-bold">
                            Lush <span className="font-light">Bites</span>
                        </h1>
                        <p className="mt-4 text-lg text-green-100 max-w-sm">
                            Your daily dose of delicious. Join our community and discover your next favorite meal.
                        </p>
                    </div>
                </div>

                {/* --- Right Panel: Login Form --- */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-4xl font-bold text-slate-800 mb-2">Welcome Back!</h2>
                        <p className="text-slate-500 mb-8">Log in to continue your culinary journey.</p>
                        
                        {error && (
                            <div className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg animate-shake" role="alert">
                                <AlertTriangle className="w-5 h-5 mr-2" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            
                            {/* Password Input */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 bg-emerald-600 text-white font-semibold p-3 rounded-lg shadow-md hover:bg-emerald-700 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Log In"
                                )}
                            </button>
                        </form>
                        
                        <p className="mt-8 text-center text-slate-500">
                            Don't have an account? {" "}
                            <Link to="/signup" className="font-semibold text-emerald-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;