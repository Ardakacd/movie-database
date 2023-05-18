import React, { useState } from "react";
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

const ViewAudience = () => {
  const [movieId, setMovieId] = useState("");
  const [audiences, setAudiences] = useState(null);
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
        `http://localhost:3001/api/v1/directors/audiences?id=${movieId}`
      );
      setAudiences(response.data.audiences);
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
        <h2 style={{ color: "orange" }}>View Audiences</h2>
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
        {Array.isArray(audiences) &&
          (audiences.length === 0 ? (
            <p style={{ color: "purple" }}>There is no audience!</p>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Username </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell> Surname</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {audiences.map((row) => (
                    <TableRow key={row.username}>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.surname}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
      </div>
    </div>
  );
};

export default ViewAudience;
