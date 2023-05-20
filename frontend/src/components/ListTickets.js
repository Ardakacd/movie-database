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
import { useNavigate } from "react-router-dom";

const ListTickets = () => {
  const [tickets, setTickets] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const madeRequest = async () => {
    try {
      const username = localStorage.getItem("audience-username");
      if (!username) {
        navigate("/audience-login");
      }
      const response = await axios.post(
        "http://localhost:3001/api/v1/audience/list-tickets",
        { username }
      );
      setTickets(response.data.tickets);
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
        <h2 style={{ color: "orange" }}>List All Tickets</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {tickets === null ? (
          <CircularProgress></CircularProgress>
        ) : tickets.length === 0 ? (
          <p style={{ color: "purple" }}>You haven't buy any ticket!</p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Movie Id </TableCell>
                  <TableCell>Movie Name</TableCell>
                  <TableCell>Session Id</TableCell>
                  <TableCell>Overall Rating</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((row) => (
                  <TableRow key={row.movie_id}>
                    <TableCell>{row.movie_id}</TableCell>
                    <TableCell>{row.movie_name}</TableCell>
                    <TableCell>{row.session_id}</TableCell>
                    <TableCell>{row.overall_rating}</TableCell>
                    <TableCell>{row.rating}</TableCell>
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

export default ListTickets;
