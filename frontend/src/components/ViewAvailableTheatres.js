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
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewAvailableTheatres = () => {
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [theatres, setTheatres] = useState(null);
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
        `http://localhost:3001/api/v1/directors/theatres?date=${date}&slots=${slots}`
      );
      setTheatres(response.data.availableTheatres);
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
        <h2 style={{ color: "orange" }}>View Available Theatres</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          id="date"
          label="Date"
          variant="standard"
          margin="normal"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          id="slot"
          label="Slot"
          variant="standard"
          margin="normal"
          value={slots}
          onChange={(event) => setSlots(event.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          View
        </Button>

        {Array.isArray(theatres) &&
          (theatres.length === 0 ? (
            <p style={{ color: "purple" }}>There is no available theatre!</p>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Theatre Id </TableCell>
                    <TableCell>Theatre District</TableCell>
                    <TableCell>Theatre Capacity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {theatres.map((row) => (
                    <TableRow key={row.theatre_id}>
                      <TableCell>{row.theatre_id}</TableCell>
                      <TableCell>{row.theatre_district}</TableCell>
                      <TableCell>{row.theatre_capacity}</TableCell>
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

export default ViewAvailableTheatres;
