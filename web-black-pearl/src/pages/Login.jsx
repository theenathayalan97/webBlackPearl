// Login.js
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    if (username && password) {
      navigate("/map");
    }
  };
  return (
    <div className="login-container">
      <Box className="login-form" sx={{ width: "300px" }}>
        <TextField
          className="input-field"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="input-field"
          type="password"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
