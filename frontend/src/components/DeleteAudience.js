import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";

const DeleteAudience = () => {
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const madeRequest = async () => {
    try {
      console.log(username);
      const response = await axios.delete(
        "http://localhost:3001/api/v1/database_managers/delete-user/" +
          username,
        { username }
      );
      setError("");
      setSuccess(response.data.message);
    } catch (error) {
      console.log(error);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 style={{ color: "orange" }}>Delete Audience</h2>
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

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Delete Audience
        </Button>
      </div>
    </div>
  );
};

export default DeleteAudience;
