import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import "../index.css";
import axios from "axios";
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ListMoviesAudience = () => {
  const [movies, setMovies] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const madeRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/audience/list-movies"
      );
      setMovies(response.data.movies);
      setError("");
      setSuccess(response.data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    madeRequest();
  }, []);

  return (
    <div className="outer-container">
      <div className="inner-list-container">
        <h2 style={{ color: "orange" }}>List All Movies</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {movies === null ? (
          <CircularProgress></CircularProgress>
        ) : movies.length === 0 ? (
          <p style={{ color: "purple" }}>
            There is no movie in the database write now!
          </p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Movie Id </TableCell>
                  <TableCell>Movie Name</TableCell>
                  <TableCell>Director Surname</TableCell>
                  <TableCell>Platform Name</TableCell>
                  <TableCell>Theatre Id</TableCell>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Predecessor List</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((row) => (
                  <TableRow key={row.movie_id}>
                    <TableCell>{row.movie_id}</TableCell>
                    <TableCell>{row.movie_name}</TableCell>
                    <TableCell>{row.director_surname}</TableCell>
                    <TableCell>{row.platform_name}</TableCell>
                    <TableCell>{row.theatre_id}</TableCell>
                    <TableCell>{row.time_slot}</TableCell>
                    <TableCell>{row.predecessor_list}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default ListMoviesAudience;
