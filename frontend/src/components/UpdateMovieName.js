import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigation } from "react-router-dom";

const UpdateMovieName = () => {
  const [movie_id, setMovieId] = useState("");
  const [movie_name, setMovieName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigation();

  const madeRequest = async () => {
    try {
      const username = localStorage.getItem("director-username");
      if (!username) {
        navigate("/director-login");
      }
      const response = await axios.put(
        "http://localhost:3001/api/v1/directors/update-movie-name",
        { movie_id, movie_name, username }
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
        <h2 style={{ color: "orange" }}>Change Movie Name</h2>
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

export default UpdateMovieName;
