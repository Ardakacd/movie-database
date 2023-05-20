import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSessions = () => {
  const [session_id, setSessionId] = useState("");
  const [movie_id, setMovieId] = useState("");
  const [movie_name, setMovieName] = useState("");
  const [duration, setDuration] = useState("");
  const [genre_list, setGenreList] = useState("");
  const [director, setDirector] = useState("");
  const [platform_id, setPlatformId] = useState("");
  const [predeccessors, setPredecessors] = useState("");
  const [theatre_id, setTheatreId] = useState("");
  const [theatre_name, setTheatreName] = useState("");
  const [theatre_capacity, setTheatreCapacity] = useState("");
  const [theatre_district, setTheatreDistrict] = useState("");
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
      //   const response = await axios.post(
      //     "http://localhost:3001/api/v1/audience/buy-ticket",
      //     { username, sessionId }
      //   );
      setError("");
      //setSuccess(response.data.message);
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
          id="movie_name"
          label="Movie Name"
          variant="standard"
          margin="normal"
          value={movie_name}
          onChange={(event) => setMovieName(event.target.value)}
        />
        <TextField
          id="duration"
          label="Duration"
          variant="standard"
          margin="normal"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
        <TextField
          id="genre_list"
          label="Genre List"
          variant="standard"
          margin="normal"
          value={genre_list}
          onChange={(event) => setGenreList(event.target.value)}
        />
        <TextField
          id="director"
          label="Director"
          variant="standard"
          margin="normal"
          value={director}
          onChange={(event) => setDirector(event.target.value)}
        />
        <TextField
          id="platform_id"
          label="Platform Id"
          variant="standard"
          margin="normal"
          value={platform_id}
          onChange={(event) => setPlatformId(event.target.value)}
        />
        <TextField
          id="predeccessors"
          label="Predeccessors"
          variant="standard"
          margin="normal"
          value={predeccessors}
          onChange={(event) => setPredecessors(event.target.value)}
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
          id="theatre_name"
          label="Theatre Name"
          variant="standard"
          margin="normal"
          value={theatre_name}
          onChange={(event) => setTheatreName(event.target.value)}
        />
        <TextField
          id="theatre_capacity"
          label="Theatre Capacity"
          variant="standard"
          margin="normal"
          value={theatre_capacity}
          onChange={(event) => setTheatreCapacity(event.target.value)}
        />
        <TextField
          id="theatre_district"
          label="Theatre District"
          variant="standard"
          margin="normal"
          value={theatre_district}
          onChange={(event) => setTheatreDistrict(event.target.value)}
        />
        <TextField
          id="time_slot"
          label="Time Slot"
          variant="standard"
          margin="normal"
          value={time_slot}
          onChange={(event) => setTimeSlot(event.target.value)}
        />
        <TextField
          id="date"
          label="Date"
          variant="standard"
          margin="normal"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

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
