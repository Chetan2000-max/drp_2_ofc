import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./login.css";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.username || !data.email || !data.password) {
      alert("Please fill in username, email, and password.");
      return;
    }

    try {
      await API.post("/new/users/", {
        username: data.username,
        email: data.email,
        password: data.password,
        role: "user",
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data || error.message || "Please check your information.";
      alert(
        `Registration failed. ${typeof message === "string" ? message : JSON.stringify(message)}`
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2>Create account</h2>

        <input
          type="text"
          placeholder="Username"
          value={data.username}
          required
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          required
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button type="submit">Register</button>

        <p className="login-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
