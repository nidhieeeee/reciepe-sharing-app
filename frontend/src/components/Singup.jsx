import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = ({ setUserData }) => {
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



  const handleSubmit = async (e) => {
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
    try{
    
      const response = await axios.post("http://localhost:5000/api/register" ,{
        name: formData.name,
        username : formData.username,
        email : formData.email,
        mobileNo : formData.phone,
        password : formData.password,
        bio : formData.bio,
        role: formData.role,
      });
      console.log(response.data);
    }
    catch(err){
      console.log(err);
    }
    
    
    setUserData(formData);
    navigate("/login");
  };

  return (
      <div className="bg-emerald-45 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900">Sign Up</h2>
          
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input type="text" name="name" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Username</label>
              <input type="text" name="username" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Choose a username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input type="email" name="email" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Phone Number</label>
              <input type="tel" name="phone" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Password</label>
              <input type="password" name="password" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input type="password" name="confirmPassword" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Short Bio</label>
              <textarea name="bio" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tell us about yourself" value={formData.bio} onChange={handleChange}></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium">Role</label>
              <select name="role" className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.role} onChange={handleChange}>
                <option value="homeCook">Home Cook</option>
                <option value="chef">Chef</option>
                <option value="foodBlogger">Food Blogger</option>
              </select>
            </div>
            <button type="submit" className="w-full mt-6 bg-emerald-500 text-white p-3 rounded-xl shadow-md hover:bg-emerald-600 transition" >
              Sign Up
            </button>
            {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <span className="text-emerald-900 hover:underline cursor-pointer" onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
  );
};

export default Signup;