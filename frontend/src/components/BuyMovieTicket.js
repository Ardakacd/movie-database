import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyMovieTicket = () => {
  const [sessionId, setSessionId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const madeRequest = async () => {
    try {
      const username = localStorage.getItem("audience-username");
      if (!username) {
        navigate("/audience-login");
      }
      const response = await axios.post(
        "http://localhost:3001/api/v1/audience/buy-ticket",
        { username, sessionId }
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
        <h2 style={{ color: "orange" }}>Buy Movie Ticket </h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          id="session_id"
          label="Session Id"
          variant="standard"
          margin="normal"
          value={sessionId}
          onChange={(event) => setSessionId(event.target.value)}
        />

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default BuyMovieTicket;
