import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate();
function handleSignup(){
  navigate("/signup");
}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    setError("");
    console.log("Logging in with:", email, password);
  };

  return (
    <div>
      <Navbar />
    <div className=" h-124 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
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
          Don't have an account?{" "}
          <a  className="text-emerald-900 hover:underline cursor-pointer" onClick={handleSignup}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
