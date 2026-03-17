"use client";

import { useState } from "react";
import { loginUser } from "@/services/user";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      console.log(res);
      alert("Login Success");

      // save user locally
      localStorage.setItem("user", JSON.stringify(res.user));

    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button type="submit">Login</button>
    </form>
  );
}