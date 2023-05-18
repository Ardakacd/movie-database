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

const ViewRatings = () => {
  const [username, setUsername] = useState("");
  const [ratings, setRatings] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const madeRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/database_managers/view-ratings/" +
          username
      );
      setRatings(response.data.ratings);
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
        <h2 style={{ color: "orange" }}>View All Ratings Of a Audience</h2>
        {success && !error && <p style={{ color: "green" }}>{success}</p>}
        {error && !success && <p style={{ color: "red" }}>{error}</p>}
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
        {Array.isArray(ratings) && ratings.length === 0 ? (
          <p style={{ color: "purple" }}>
            This audience does not rate any film!
          </p>
        ) : (
          Array.isArray(ratings) && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Movie Id</TableCell>
                    <TableCell>Movie Name</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ratings.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.movie_id}
                      </TableCell>
                      <TableCell>{row.movie_name}</TableCell>
                      <TableCell>{row.rating}</TableCell>
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

export default ViewRatings;
