import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movie_id, setMovieId] = useState("");
  const [movie_name, setMovieName] = useState("");
  const [duration, setDuration] = useState("");
  const [genre_list, setGenreList] = useState("");
  const [predecessors, setPredecessors] = useState("");
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
        "http://localhost:3001/api/v1/directors/add-movie",
        {
          movie_id,
          movie_name,
          duration,
          genre_list,
          predecessors,
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
        <h2 style={{ color: "orange" }}>Add Movie </h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <p style={{ color: "gray" }}>
          Please enter like 80001,80002(id of the genres) if you want to add
          more than one
        </p>
        <TextField
          id="predeccessors"
          label="Predeccessors"
          variant="standard"
          margin="normal"
          value={predecessors}
          onChange={(event) => setPredecessors(event.target.value)}
        />
        <p style={{ color: "gray" }}>
          Please enter like 1,2,3(id of the predecessors) if you want to add
          more than one
        </p>

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Add Movie
        </Button>
      </div>
    </div>
  );
};

export default AddMovie;
