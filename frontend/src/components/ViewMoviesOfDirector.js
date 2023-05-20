import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const ViewMoviesOfDirector = () => {
  const [movies, setMovies] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const madeRequest = async () => {
    try {
      const username = localStorage.getItem("director-username");
      if (!username) {
        navigate("/director-login");
      }
      const response = await axios.get(
        `http://localhost:3001/api/v1/directors/view-movies?username=${username}`
      );
      setMovies(response.data.films);
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
        <h2 style={{ color: "orange" }}>View Movies Of Director</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {movies === null ? (
          <CircularProgress></CircularProgress>
        ) : movies.length === 0 ? (
          <p style={{ color: "purple" }}>
            There is no movie that this director directs
          </p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Movie Id </TableCell>
                  <TableCell>Movie Name</TableCell>
                  <TableCell>Theatre Id</TableCell>
                  <TableCell>Time Slot</TableCell>
                  <TableCell>Predecessors List</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((row) => (
                  <TableRow key={row.movie_id}>
                    <TableCell>{row.movie_id}</TableCell>
                    <TableCell>{row.movie_name}</TableCell>
                    <TableCell>{row.theatre_id}</TableCell>
                    <TableCell>{row.time_slot}</TableCell>
                    <TableCell>{row.predecessors_list}</TableCell>
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

export default ViewMoviesOfDirector;
