import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try{
      const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/User/login",
      {
        email: email,
        password: password,
      }
    );
    localStorage.setItem("token",response.data.token);
    toast.success("Login successfull");
    console.log(response.data);
    const user = response.data.User;
    if(user.role=="admin"){
        navigate("/admin")
    }else{
      navigate("/");
    }
      
    }catch(e){
        console.log("login fails",e);
        toast.error("Login failed.please check your credentials");
    }
    
  }

  return (
    <div className="h-screen w-full bg-[url('bg3.jpg')] bg-cover bg-center flex " style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* Left side branding */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-secondery/40 backdrop-blur-xl">
        <img src="/logo.png" className="w-52 opacity-90" />
        <h1 className="text-primary text-4xl font-semibold mt-6 tracking-wide">
          CRYSTAL BEAUTY CLEAR
        </h1>
        <p className="text-primary/80 mt-2 text-lg text-center px-10">
          Discover your natural glow with premium crystal-inspired skincare and beauty products.
        </p>
      </div>

      {/* Login form */}
      <div className="w-1/2 h-full flex items-center justify-center p-4">
        <div className="w-[480px] min-h-[500px] bg-white/15 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl flex flex-col gap-8 items-center justify-center p-10 animate-fadeIn">

          <h2 className="text-white text-3xl font-semibold tracking-wide">Welcome Back</h2>
          <p className="text-white/70 text-sm -mt-4 mb-2">Log in to continue your beauty journey with CBC.</p>

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-[350px] h-[45px] bg-white/20 placeholder-white/80 text-white px-4 rounded-lg border border-white/40 focus:outline-none focus:border-accent/80 transition"
            type="text"
            placeholder="Email address"
          />

          <input
            onChange={(e) => setpassword(e.target.value)}
            className="w-[350px] h-[45px] bg-white/20 placeholder-white/80 text-white px-4 rounded-lg border border-white/40 focus:outline-none focus:border-accent/80 transition"
            type="password"
            placeholder="Password"
          />

          <button
            onClick={login}
            className="w-[350px] h-[45px] bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent/90 transition active:scale-95"
          >
            Login
          </button>

          <p className="text-white/70 text-sm mt-2">
            Forgot your password? <span className="text-accent cursor-pointer hover:underline">Recover it</span>
          </p>

          <p className="text-white/60 text-sm -mt-4">
            New to CBC? <span className="text-accent cursor-pointer hover:underline">Create an account</span>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;

