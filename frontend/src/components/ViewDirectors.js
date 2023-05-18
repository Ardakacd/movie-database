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

const ViewDirectors = () => {
  const [directors, setDirectors] = useState(null);
  const [error, setError] = useState("");

  const madeRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/database_managers/view-directors"
      );
      setError("");
      setDirectors(response.data.directors);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    madeRequest();
  }, []);

  return (
    <div className="outer-container">
      <div className="inner-list-container">
        <h2 style={{ color: "orange" }}>Directors:</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {directors === null ? (
          <CircularProgress></CircularProgress>
        ) : directors.length === 0 ? (
          <p style={{ color: "purple" }}>
            There is no director in the database write now!
          </p>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Nationality</TableCell>
                  <TableCell>Platform Id</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {directors.map((row) => (
                  <TableRow
                    key={row.username}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.surname}</TableCell>
                    <TableCell>{row.nationality}</TableCell>
                    <TableCell>{row.platform_id}</TableCell>
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

export default ViewDirectors;
