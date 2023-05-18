import { Link } from "react-router-dom";

const DbManagerMain = () => {
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
        <h1 style={{ color: "black" }}>Hello Db Manager!</h1>
        <Link to="/" style={{ margin: 0, padding: 0, textDecoration: "none" }}>
          Logout
        </Link>
      </div>

      <h4 style={{ color: "blue" }}>Functionalities</h4>
      <Link to="/add-audience" style={{ marginBottom: "10px" }}>
        Add Audience
      </Link>
      <Link to="/add-director" style={{ marginBottom: "10px" }}>
        Add Director
      </Link>
      <Link to="/delete-audience" style={{ marginBottom: "10px" }}>
        Delete Audience
      </Link>
      <Link to="/update-platform" style={{ marginBottom: "10px" }}>
        Update Platform Id Of Director
      </Link>
      <Link to="/view-average-rating" style={{ marginBottom: "10px" }}>
        View Average Rating Of Movie
      </Link>
      <Link to="/view-directors" style={{ marginBottom: "10px" }}>
        View Directors
      </Link>
      <Link to="/view-movies" style={{ marginBottom: "10px" }}>
        View Movies of a Director
      </Link>
      <Link to="/view-ratings" style={{ marginBottom: "10px" }}>
        View Ratings of a Specific Audience
      </Link>
    </div>
  );
};

export default DbManagerMain;
