import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSessions = () => {
  const [session_id, setSessionId] = useState("");
  const [movie_id, setMovieId] = useState("");
  const [theatre_id, setTheatreId] = useState("");
  const [time_slot, setTimeSlot] = useState("");
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const madeRequest = async () => {
    try {
      const username = localStorage.getItem("director-username");
      if (!username) {
        navigate("/director-login");
      }
      const response = await axios.post(
        "http://localhost:3001/api/v1/directors/add-session",
        {
          session_id,
          movie_id,
          theatre_id,
          time_slot,
          date,
          username,
        }
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
        <h2 style={{ color: "orange" }}>Add Movie Session </h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          id="session_id"
          label="Session Id"
          variant="standard"
          margin="normal"
          value={session_id}
          onChange={(event) => setSessionId(event.target.value)}
        />
        <TextField
          id="movie_id"
          label="Movie Id"
          variant="standard"
          margin="normal"
          value={movie_id}
          onChange={(event) => setMovieId(event.target.value)}
        />
        <TextField
          id="theatre_id"
          label="Theatre Id"
          variant="standard"
          margin="normal"
          value={theatre_id}
          onChange={(event) => setTheatreId(event.target.value)}
        />
        <TextField
          id="time_slot"
          label="Time Slot"
          variant="standard"
          margin="normal"
          value={time_slot}
          onChange={(event) => setTimeSlot(event.target.value)}
        />
        <p style={{ color: "gray" }}>Please enter 1,2,3 or 4</p>
        <TextField
          id="date"
          label="Date"
          variant="standard"
          margin="normal"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <p style={{ color: "gray" }}>For example 2023-12-31</p>

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Add Session
        </Button>
      </div>
    </div>
  );
};

export default AddSessions;
