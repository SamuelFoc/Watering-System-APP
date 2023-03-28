import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import axios from "../api/axios";
import Cookies from "js-cookie";

const Login = (props) => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/Auth/In", form, {
        headers: { "Content-Type": "application/json" },
      });
      Cookies.set("authToken", response?.data?.token);
      navigate("/", { replace: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Incorrect credentials");
    }
  };

  return (
    <>
      <LoginForm
        onChange={handleChange}
        onSubmit={handleLogin}
        onLoad={loading}
        onError={error}
      />
    </>
  );
};

export default Login;
