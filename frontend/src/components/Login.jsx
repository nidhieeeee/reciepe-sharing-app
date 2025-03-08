import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cherry } from 'lucide-react';
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate();
function handleSignup(){
  navigate("/signup");
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    setError("");
    try{
      const response = await axios.post("http://localhost:5000/api/login" ,{
          email : email,
          password:password 
      },
      {
        withCredentials: true 
      }
 
      //here add an object withCredentials: true OBJECT {} done!>.<  nowwwww try running the login and check cookies send me ss when done
    
    ); 
      console.log(response.data);
      console.log("Logging in with:", email, password);
      navigate("/recipe");
    }
    catch(err){
      console.log(err); 
    }
  };

  return (
    <div className="flex h-screen bg-emerald-45">
    {/* Left Side - Logo and Name */}
    <div className="w-full md:w-1/2  flex flex-col justify-center items-center ">
      <Cherry size={300} strokeWidth={1} className="text-emerald-700" />
      <h1 className="text-4xl font-bold text-emerald-700"><i>Lush <strong>Bites</strong></i></h1>
    </div>

    {/* Right Side - Login Form */}
   
    <div className="w-full md:w-1/2  flex flex-col justify-center  p-8">
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-semibold mb-6">Login</h2>
      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-emerald-500 text-white p-3 rounded-xl shadow-md hover:bg-emerald-600 transition cursor-pointer"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account? {" "}
        <a className="text-emerald-900 hover:underline cursor-pointer" onClick={handleSignup}>
          Sign Up
        </a>
      </p>
    </div>
    </div>
  </div>
);
};

export default Login;
