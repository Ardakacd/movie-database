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
  addDirector,
  addAudience,
} from "./databaseManagers/controller/databaseManagerController.js";
import {
  listMovies,
  buyMovieTicket,
  listTickets,
  login as audienceLogin,
} from "./audience/controller/audienceController.js";

import {
  userLogin,
  viewAvailableTheatres,
  addPredecessors,
  viewAudiences,
  updateMovieName,
  viewMoviesOfDirector,
  addSession,
  addTheatre,
  addMovie
} from "./director/controller/directorController.js";

const db_managers = "/database_managers";

const directors = "/directors";

const audience = "/audience";

router.post(`${db_managers}/login`, login);

router.post(`${db_managers}/add-director`, addDirector);

router.post(`${db_managers}/add-audience`, addAudience);

router.delete(`${db_managers}/delete-user/:username`, deleteUser);

router.put(`${db_managers}/update-platform-id`, updatePlatformId);

router.get(`${db_managers}/view-directors`, viewAllDirectors);

router.get(`${db_managers}/view-ratings/:username`, viewRatings);

router.get(`${db_managers}/view-director-movies/:username`, viewDirectorMovies);

router.get(`${db_managers}/view-movie-detail/:movieId`, viewMovieDetail);



router.post(`${audience}/login`, audienceLogin);

router.get(`${audience}/list-movies`, listMovies);

router.post(`${audience}/buy-ticket`, buyMovieTicket);

router.post(`${audience}/list-tickets`, listTickets);




router.get(`${directors}/theatres`, viewAvailableTheatres);

router.get(`${directors}/audiences`, viewAudiences);

router.get(`${directors}/view-movies`, viewMoviesOfDirector);

router.post(`${directors}/login`, userLogin);

router.post(`${directors}/add-predecessors`, addPredecessors);

router.post(`${directors}/add-session`, addSession);

router.post(`${directors}/add-theatre`, addTheatre);

router.post(`${directors}/add-movie`, addMovie);

router.put(`${directors}/update-movie-name`, updateMovieName);

export default router;
