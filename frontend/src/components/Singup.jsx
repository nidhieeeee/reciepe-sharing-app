import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Cherry, Mail, Lock, User, AlertTriangle, Loader2 } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    
    // --- State Management ---
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // --- NEW: Loading state ---

    const apiBaseUrl = import.meta.env.VITE_BASE_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        setLoading(true);
        try {
            // --- MODIFIED: API call with base URL ---
            const response = await axios.post(`${apiBaseUrl}/api/auth/signup`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            // --- IMPROVED USER FLOW: Automatically log in after successful signup ---
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/recipe"); // Navigate directly into the app

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
            setError(errorMessage);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
                
                {/* --- Header with Logo and Brand Name --- */}
                <div className="text-center mb-8">
                    <Cherry size={60} strokeWidth={1.5} className="mx-auto text-emerald-600" />
                    <h1 className="text-4xl font-bold text-slate-800 mt-2">
                        Create Your Account
                    </h1>
                    <p className="text-slate-500 mt-2">Join Lush Bites to start sharing and discovering recipes!</p>
                </div>
                
                {/* --- Error Message Display --- */}
                {error && (
                    <div className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                            disabled={loading}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                            disabled={loading}
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                            disabled={loading}
                        />
                    </div>
                    
                    {/* Confirm Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
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
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-emerald-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;