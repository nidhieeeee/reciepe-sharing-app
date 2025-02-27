import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Signup = () => {
  const navigate = useNavigate();
  function handleLogin(){
    navigate("/login");
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    setError("");
    console.log("Signing up with:", formData);
  };

  return (
    <div><Navbar />
    <div className=" bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign Up</h2>
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-emerald-500 text-white p-3 rounded-xl shadow-md hover:bg-emerald-600 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-emerald-900 hover:underline cursor-pointer" onClick={handleLogin}>
            Login
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
