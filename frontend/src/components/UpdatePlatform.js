import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";

const UpdatePlatform = () => {
  const [username, setUsername] = useState("");
  const [platformId, setPlatformId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const madeRequest = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/database_managers/update-platform-id",
        { username, platformId }
      );
      setError("");
      setSuccess(response.data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 style={{ color: "orange" }}>Change Platform Id Of The Director</h2>
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
          id="platform_id"
          label="Platform Id"
          variant="standard"
          margin="normal"
          value={platformId}
          onChange={(event) => setPlatformId(event.target.value)}
        />

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default UpdatePlatform;
