import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/api";
import { setUser } from "../features/userSlice";
import { fetchUserCart } from "../features/cartSlice";
import { toast } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await api.post("/api/auth/signin", body);
      const user = response.data.user;
      const token = response.data.token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      toast.success("Login successfull");
      dispatch(setUser(user));
      dispatch(fetchUserCart());
      navigate("/");
    } catch (error) {
      toast.error(error);
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Signin;
