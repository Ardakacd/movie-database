import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css";
import { useNavigate } from "react-router-dom";

const DbManagerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const madeRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/database_managers/login",
        { username, password }
      );
      setSuccess(response.data.message);
      navigate("/db-manager-main");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 style={{ color: "orange" }}>Db Manager Login</h2>
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
        <Link to="/director-login" style={{ marginTop: "15px" }}>
          Login as Director
        </Link>
        <Link to="/audience-login" style={{ marginTop: "15px" }}>
          Login as Audience
        </Link>
      </div>
    </div>
  );
};

export default DbManagerLogin;
