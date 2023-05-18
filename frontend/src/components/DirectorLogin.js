import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.css";

const DirectorLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const madeRequest = () => {};

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 style={{ color: "orange" }}>Director Login </h2>
        {success && !error && <p style={{ color: "green" }}>{success}</p>}
        {error && !success && <p style={{ color: "red" }}>{error}</p>}
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
        <Link to="/audience-login" style={{ marginTop: "15px" }}>
          Login as Audience
        </Link>
      </div>
    </div>
  );
};

export default DirectorLogin;
