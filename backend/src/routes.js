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

import {
   userLogin,
   viewAvailableTheatres,
   addPredecessors,
   viewAudiences,
   updateMovieName,
   viewMoviesOfDirector
  } from "./director/controller/directorController.js";

const db_managers = "/database_managers";

router.post(`${db_managers}/login`, login);

router.delete(`${db_managers}/delete-user`, deleteUser);

router.put(`${db_managers}/update-platform-id`, updatePlatformId);

router.get(`${db_managers}/view-directors`, viewAllDirectors);

router.get(`${db_managers}/view-ratings`, viewRatings);

router.get(`${db_managers}/view-director-movies`, viewDirectorMovies);

router.get(`${db_managers}/view-movie-detail`, viewMovieDetail);

const directors = "/directors";

router.get(`${directors}/theatres`, viewAvailableTheatres);

router.get(`${directors}/audiences`, viewAudiences);

router.get(`${directors}/view-movies`, viewMoviesOfDirector);

router.post(`${directors}/login`, userLogin);

router.post(`${directors}/add-predecessors`, addPredecessors);

router.put(`${directors}/update-movie-name`, updateMovieName);







export default router;
