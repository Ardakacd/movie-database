import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDirector = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  const [platformId, setPlatformId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const madeRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/database_managers/add-director",
        {
          username,
          password,
          name,
          surname,
          nationality,
          platform_id: platformId,
        }
      );
      console.log(response);
      setError("");
      setSuccess(response.data.message);
    } catch (error) {
      console.log(error);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <h2 style={{ color: "orange" }}>Add Director</h2>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p style={{ color: "purple" }}>
          When you add an director corresponding audience will also be created!
        </p>
        <TextField
          id="username"
          label="Username"
          variant="standard"
          margin="normal"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          id="name"
          label="Name"
          variant="standard"
          margin="normal"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          id="surname"
          label="Surname"
          variant="standard"
          margin="normal"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <TextField
          id="nationality"
          label="Nationality"
          variant="standard"
          margin="normal"
          value={nationality}
          onChange={(event) => setNationality(event.target.value)}
        />
        <TextField
          id="platform_id"
          label="Platform Id"
          variant="standard"
          margin="normal"
          value={platformId}
          onChange={(event) => setPlatformId(event.target.value)}
        />

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={madeRequest}
        >
          Add Director
        </Button>
      </div>
    </div>
  );
};

export default AddDirector;
