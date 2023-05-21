import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTheatre = () => {
  const [theatre_id, setTheatreId] = useState("");
  const [theatre_name, setTheatreName] = useState("");
  const [theatre_capacity, setTheatreCapacity] = useState("");
  const [theatre_district, setTheatreDistrict] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const madeRequest = async () => {
    try {
      const username = localStorage.getItem("director-username");
      if (!username) {
        navigate("/director-login");
      }
      const response = await axios.post(
        "http://localhost:3001/api/v1/directors/add-theatre",
        {
          theatre_id,
          theatre_name,
          theatre_district,
          theatre_capacity,
        }
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
        <h2 style={{ color: "orange" }}>Add Theatre</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <TextField
          id="theatre_id"
          label="Theatre Id"
          variant="standard"
          margin="normal"
          value={theatre_id}
          onChange={(event) => setTheatreId(event.target.value)}
        />
        <TextField
          id="theatre_name"
          label="Theatre Name"
          variant="standard"
          margin="normal"
          value={theatre_name}
          onChange={(event) => setTheatreName(event.target.value)}
        />
        <TextField
          id="theatre_capacity"
          label="Theatre Capacity"
          variant="standard"
          margin="normal"
          value={theatre_capacity}
          onChange={(event) => setTheatreCapacity(event.target.value)}
        />
        <TextField
          id="theatre_district"
          label="Theatre District"
          variant="standard"
          margin="normal"
          value={theatre_district}
          onChange={(event) => setTheatreDistrict(event.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Add Theatre
        </Button>
      </div>
    </div>
  );
};

export default AddTheatre;
