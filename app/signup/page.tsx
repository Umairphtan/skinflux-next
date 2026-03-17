"use client";

import { useState } from "react";
import { signupUser } from "@/services/user";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signupUser(form);
      alert(res.message);
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />

      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button type="submit">Signup</button>
    </form>
  );
}