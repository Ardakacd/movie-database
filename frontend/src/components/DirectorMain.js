import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DirectorMain = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem("director-username");
    if (!username) {
      navigate("/director-login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("director-username");
    navigate("/director-login");
  };

  return (
    <div style={{ display: "flex", padding: "50px", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "black" }}>Hello Director!</h1>
        <p style={{ cursor: "pointer" }} onClick={handleLogout}>
          Logout
        </p>
      </div>

      <h4 style={{ color: "blue" }}>Functionalities</h4>
      <Link to="/view-available-theatres" style={{ marginBottom: "10px" }}>
        View Available Theatres
      </Link>
      <Link to="/view-audiences" style={{ marginBottom: "10px" }}>
        View Audiences
      </Link>
      <Link to="/view-movies-director" style={{ marginBottom: "10px" }}>
        View Movies Director
      </Link>
      <Link to="/add-movie" style={{ marginBottom: "10px" }}>
        Add Movie
      </Link>
      <Link to="/add-theatre" style={{ marginBottom: "10px" }}>
        Add Theatre
      </Link>
      <Link to="/add-session" style={{ marginBottom: "10px" }}>
        Add Session
      </Link>
      <Link to="/add-predecessor" style={{ marginBottom: "10px" }}>
        Add Predecessor
      </Link>
      <Link to="/update-movie-name" style={{ marginBottom: "10px" }}>
        Update Movie Name
      </Link>
    </div>
  );
};

export default DirectorMain;
