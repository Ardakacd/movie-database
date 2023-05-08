import express from "express";
const router = express.Router();
import {
  login,
  deleteUser,
  updatePlatformId,
  viewAllDirectors,
  viewRatings,
  viewMovieDetail,
  viewDirectorMovies,
} from "./databaseManagers/controller/databaseManagerController.js";

const db_managers = "/database_managers";

router.post(`${db_managers}/login`, login);

router.delete(`${db_managers}/delete-user`, deleteUser);

router.put(`${db_managers}/update-platform-id`, updatePlatformId);

router.get(`${db_managers}/view-directors`, viewAllDirectors);

router.get(`${db_managers}/view-ratings`, viewRatings);

router.get(`${db_managers}/view-director-movies`, viewDirectorMovies);

router.get(`${db_managers}/view-movie-detail`, viewMovieDetail);

export default router;
