import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
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

const ViewMoviesDbManager = () => {
  const [username, setUsername] = useState("");
  const [movies, setMovies] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const madeRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/database_managers/view-director-movies/" +
          username
      );
      setMovies(response.data.movies);
      setError("");
      setSuccess(response.data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-list-container">
        <h2 style={{ color: "orange" }}>View All Movies Of a Director</h2>
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
          View
        </Button>

        {Array.isArray(movies) && movies.length === 0 ? (
          <p style={{ color: "purple" }}>
            This director does not direct any film(also check whether this
            director exists)
          </p>
        ) : (
          Array.isArray(movies) && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Movie Id</TableCell>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Theatre Id</TableCell>
                    <TableCell>Theatre District</TableCell>
                    <TableCell>Time Slot</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movies.map((row) => (
                    <TableRow
                      key={row.username}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.movie_id}
                      </TableCell>
                      <TableCell>{row.movie_name}</TableCell>
                      <TableCell>{row.theatre_id}</TableCell>
                      <TableCell>{row.theatre_district}</TableCell>
                      <TableCell>{row.time_slot}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        )}
      </div>
    </div>
  );
};

export default ViewMoviesDbManager;
