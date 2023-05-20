import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AudienceLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const madeRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/audience/login",
        { username, password }
      );
      setSuccess(response.data.message);
      localStorage.setItem("audience-username", username);
      navigate("/audience-main");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 style={{ color: "orange" }}>Audience Login</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          id="username"
          label="Username"
          variant="standard"
          margin="normal"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Login
        </Button>
        <Link to="/" style={{ marginTop: "15px" }}>
          Login as Db Manager
        </Link>
        <Link to="/director-login" style={{ marginTop: "15px" }}>
          Login as Director
        </Link>
      </div>
    </div>
  );
};

export default AudienceLogin;
