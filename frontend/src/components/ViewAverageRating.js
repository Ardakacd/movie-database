import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";

const ViewAverageRating = () => {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const madeRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/database_managers/view-movie-detail/" +
          movieId
      );
      setMovie(response.data.movie[0]);
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
        <h2 style={{ color: "orange" }}>View Average Rating of a Movie</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          id="movie_id"
          label="Movie Id"
          variant="standard"
          margin="normal"
          value={movieId}
          onChange={(event) => setMovieId(event.target.value)}
        />

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          View
        </Button>
        {movie && (
          <>
            <p>Movie Id: {movie.movie_id}</p>
            <p>Movie Name: {movie.movie_name}</p>
            <p>Average Rating: {movie.average_rating}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAverageRating;
