import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DbManagerLogin from "./components/DbManagerLogin";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeleteAudience from "./components/DeleteAudience";
import UpdatePlatform from "./components/UpdatePlatform";
import ViewAverageRating from "./components/ViewAverageRating";
import ViewDirectors from "./components/ViewDirectors";
import ViewMoviesDbManager from "./components/ViewMoviesDbManager";
import ViewRatings from "./components/ViewRatings";
import DbManagerMain from "./components/DbManagerMain";
import AudienceLogin from "./components/AudienceLogin";
import DirectorLogin from "./components/DirectorLogin";
import AudienceMain from "./components/AudienceMain";
import ListTickets from "./components/ListTickets";
import ListMoviesAudience from "./components/ListMoviesAudience";
import BuyMovieTicket from "./components/BuyMovieTicket";
import AddAudience from "./components/AddAudience";
import AddDirector from "./components/AddDirector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DbManagerLogin />,
  },
  {
    path: "add-audience",
    element: <AddAudience></AddAudience>,
  },
  {
    path: "add-director",
    element: <AddDirector></AddDirector>,
  },
  {
    path: "delete-audience",
    element: <DeleteAudience></DeleteAudience>,
  },
  {
    path: "update-platform",
    element: <UpdatePlatform></UpdatePlatform>,
  },
  {
    path: "view-average-rating",
    element: <ViewAverageRating></ViewAverageRating>,
  },
  {
    path: "view-directors",
    element: <ViewDirectors></ViewDirectors>,
  },
  {
    path: "view-movies",
    element: <ViewMoviesDbManager></ViewMoviesDbManager>,
  },
  {
    path: "view-ratings",
    element: <ViewRatings></ViewRatings>,
  },
  {
    path: "audience-login",
    element: <AudienceLogin></AudienceLogin>,
  },
  {
    path: "director-login",
    element: <DirectorLogin />,
  },
  {
    path: "list-tickets",
    element: <ListTickets />,
  },
  {
    path: "list-movies-audience",
    element: <ListMoviesAudience />,
  },
  {
    path: "buy-ticket",
    element: <BuyMovieTicket />,
  },
  {
    path: "audience-main",
    element: <AudienceMain />,
  },
  {
    path: "db-manager-main",
    element: <DbManagerMain />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
