import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AudienceMain = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem("audience-username");
    if (!username) {
      navigate("/audience-login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("audience-username");
    navigate("/audience-login");
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
        <h1 style={{ color: "black" }}>Hello Audience!</h1>
        <p style={{ cursor: "pointer" }} onClick={handleLogout}>
          Logout
        </p>
      </div>

      <h4 style={{ color: "blue" }}>Functionalities</h4>
      <Link to="/list-movies-audience" style={{ marginBottom: "10px" }}>
        List Movies
      </Link>
      <Link to="/buy-ticket" style={{ marginBottom: "10px" }}>
        Buy Movie Ticket
      </Link>
      <Link to="/list-tickets" style={{ marginBottom: "10px" }}>
        List Tickets
      </Link>
    </div>
  );
};

export default AudienceMain;
