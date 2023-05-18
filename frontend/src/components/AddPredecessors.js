import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPredecessors = () => {
  const [movie_id, setMovieId] = useState("");
  const [pre_ids, setPreIds] = useState("");
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
        "http://localhost:3001/api/v1/directors/add-predecessors",
        { movie_id, pre_ids }
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
        <h2 style={{ color: "orange" }}>Add Predecessor</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          id="movie_id"
          label="Movie Id"
          variant="standard"
          margin="normal"
          value={movie_id}
          onChange={(event) => setMovieId(event.target.value)}
        />
        <TextField
          id="pre_id"
          label="Predecessor Id"
          variant="standard"
          margin="normal"
          value={pre_ids}
          onChange={(event) => setPreIds(event.target.value)}
        />
        <p style={{ color: "gray" }}>
          If you want to add more than one please add like 1,2,3
        </p>
        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddPredecessors;
