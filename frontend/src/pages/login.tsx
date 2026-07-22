import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await API.post("/login/", data);
      const { access, refresh, username, role, is_active } = res.data || {};

      if (!access) {
        throw new Error("Login response did not include an access token.");
      }

      localStorage.setItem("token", access);
      if (refresh) localStorage.setItem("refresh", refresh);
      if (username) localStorage.setItem("username", username);
      if (role) localStorage.setItem("role", role);
      if (typeof is_active !== "undefined") {
        localStorage.setItem("is_active", String(is_active));
      }

      console.log("Login successful", res.data);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password");
      console.log("Login error", error);
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={submit}
      >
        <h2>Your Projects</h2>

        <input type="text" placeholder="Username" value={data.username} 
          onChange={(e) =>
            setData({
              ...data,
              username: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
        />

        <button type="submit">
          Login
        </button>

        <p className="login-footer">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;