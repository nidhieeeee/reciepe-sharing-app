import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = ({setUserData}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bio: "",
    role: "home_cook",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Signing up with:", formData);
    setUserData(formData);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900">Sign Up</h2>
          {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input type="text" name="name" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Username</label>
              <input type="text" name="username" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" placeholder="Choose a username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" name="email" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Phone Number</label>
              <input type="tel" name="phone" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Password</label>
              <input type="password" name="password" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input type="password" name="confirmPassword" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Short Bio</label>
              <textarea name="bio" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" placeholder="Tell us about yourself" value={formData.bio} onChange={handleChange}></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Role</label>
              <select name="role" className="w-full p-3 mt-1 border rounded-xl focus:ring-emerald-500" value={formData.role} onChange={handleChange}>
                <option value="home_cook">Home Cook</option>
                <option value="chef">Chef</option>
                <option value="food_blogger">Food Blogger</option>
              </select>
            </div>
            <button type="submit" className="w-full mt-6 bg-emerald-500 text-white p-3 rounded-xl shadow-md hover:bg-emerald-600 transition" onClick={()=>navigate("/userprofile")}>
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <span className="text-emerald-900 hover:underline cursor-pointer" onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;