import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/User",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastname: lastName,
          role: "user"
        }
      );
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (e) {
      console.error("Registration failed", e);
      toast.error(e.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="h-screen w-full bg-[url('bg3.jpg')] bg-cover bg-center flex">
      
      {/* Left side branding */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-secondery/40 backdrop-blur-xl">
        <img src="/logo.png" className="w-52 opacity-90" alt="logo" />
        <h1 className="text-primary text-4xl font-semibold mt-6 tracking-wide">
          CRYSTAL BEAUTY CLEAR
        </h1>
        <p className="text-primary/80 mt-2 text-lg text-center px-10">
          Discover your natural glow with premium crystal-inspired skincare and beauty products.
        </p>
      </div>

      {/* Register form */}
      <div className="w-1/2 h-full flex items-center justify-center p-4">
        <div className="w-[480px] min-h-[550px] bg-white/15 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl flex flex-col gap-6 items-center justify-center p-10 animate-fadeIn">

          <h2 className="text-white text-3xl font-semibold tracking-wide">Create Account</h2>
          <p className="text-white/70 text-sm -mt-4 mb-2">Join us to start your beauty journey with CBC.</p>
          
          <div className="flex gap-4">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="w-[167px] h-[45px] bg-white/20 placeholder-white/80 text-white px-4 rounded-lg border border-white/40 focus:outline-none focus:border-accent/80 transition"
              type="text"
              placeholder="First Name"
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="w-[167px] h-[45px] bg-white/20 placeholder-white/80 text-white px-4 rounded-lg border border-white/40 focus:outline-none focus:border-accent/80 transition"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-[350px] h-[45px] bg-white/20 placeholder-white/80 text-white px-4 rounded-lg border border-white/40 focus:outline-none focus:border-accent/80 transition"
            type="email"
            placeholder="Email address"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-[350px] h-[45px] bg-white/20 placeholder-white/80 text-white px-4 rounded-lg border border-white/40 focus:outline-none focus:border-accent/80 transition"
            type="password"
            placeholder="Password"
          />

          <button
            onClick={handleRegister}
            className="w-[350px] h-[45px] bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent/90 transition active:scale-95 mt-2"
          >
            Register
          </button>

          <p className="text-white/70 text-sm mt-2">
            Already have an account? <Link to="/login" className="text-accent cursor-pointer hover:underline font-medium">Login here</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
