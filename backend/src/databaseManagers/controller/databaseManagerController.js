import { query } from "../../../databaseConnection.js";
import EmptyFieldError from "../../shared/errors/EmptyField/EmptyField.js";
import AudienceNotFound from "../../shared/errors/NotFound/AudienceNotFound.js";
import DatabaseManagerNotFound from "../../shared/errors/NotFound/DatabaseManagerNotFound.js";
import DirectorNotFound from "../../shared/errors/NotFound/DirectorNotFound.js";
import successfulResponse from "../../shared/response/successfulResponse.js";
export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      next(new EmptyFieldError());
      return;
    }

    const queryString = `SELECT * FROM Database_Managers WHERE username = ? AND password = ?;`;

    const queryResponse = await query(queryString, [username, password]);

    if (queryResponse.length == 0) {
      next(new DatabaseManagerNotFound());
      return;
    }

    console.log(queryResponse);

    res
      .status(201)
      .json(successfulResponse("Database Manager is logged in successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addDirector(req, res, next) {
  try {
    const { username, password, name, surname, nationality, platformId } =
      req.body;

    if (!(username && password && name && surname && nationality)) {
      next(new EmptyFieldError());
      return;
    }

    const queryString = `INSERT INTO Directors(username,password,name,surname,nationality,platform_id) VALUES(?,?,?,?,?,?);`;

    const queryResponse = await query(queryString, [
      username,
      password,
      name,
      surname,
      nationality,
      platformId,
    ]);

    res.status(201).json(successfulResponse("Director is added successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addAudience(req, res, next) {
  try {
    const { username, password, name, surname } = req.body;

    if (!(username && password && name && surname)) {
      next(new EmptyFieldError());
      return;
    }

    const queryString = `INSERT INTO Audience(username,password,name,surname) VALUES(?,?,?,?);`;

    const queryResponse = await query(queryString, [
      username,
      password,
      name,
      surname,
    ]);

    res.status(201).json(successfulResponse("Audience is added successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { username } = req.params;

    if (!username) {
      next(new EmptyFieldError("Please provide a username"));
      return;
    }

    const queryString = `DELETE FROM Audience WHERE username = ?;`;

    const queryResponse = await query(queryString, [username]);

    console.log(queryResponse);
    if (queryResponse.affectedRows == 0) {
      next(new AudienceNotFound());
      return;
    }

    res
      .status(200)
      .json(successfulResponse("Audience is deleted successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updatePlatformId(req, res, next) {
  try {
    const { username, platformId } = req.body;

    if (!(username && platformId)) {
      next(new EmptyFieldError());
      return;
    }

    const queryString = `UPDATE Directors SET platform_id=? WHERE username = ?;`;

    const queryResponse = await query(queryString, [platformId, username]);

    if (queryResponse.affectedRows == 0) {
      next(new DirectorNotFound());
      return;
    }

    res
      .status(200)
      .json(successfulResponse("Platform id is changed successfully"));
  } catch (error) {
    console.log(error);

    next(error);
  }
}

export async function viewAllDirectors(req, res, next) {
  try {
    const queryString = `SELECT username, name, surname, nationality, platform_id FROM Directors`;

    const queryResponse = await query(queryString);

    res.status(200).json({
      ...successfulResponse("Directors are listed successfully"),
      directors: queryResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

export async function viewRatings(req, res, next) {
  try {
    const { username } = req.params;

    if (!username) {
      next(new EmptyFieldError("Please provide a username"));
      return;
    }
    const queryString = `SELECT R.movie_id,M.movie_name,R.rating FROM Ratings as R INNER JOIN Movies as M ON M.movie_id = R.movie_id WHERE R.username = ?`;

    const queryResponse = await query(queryString, [username]);

    console.log(queryResponse);

    res.status(200).json({
      ...successfulResponse("Ratings are listed successfully"),
      ratings: queryResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

export async function viewDirectorMovies(req, res, next) {
  try {
    const { username } = req.params;

    if (!username) {
      next(new EmptyFieldError("Please provide a username"));
      return;
    }
    const queryString = `SELECT M.movie_id, M.movie_name,T.theatre_id,T.theatre_district,S.time_slot FROM 
    Directors AS D INNER JOIN Movies AS M ON D.username = M.director INNER JOIN Movie_Sessions AS S ON M.movie_id = S.movie_id INNER JOIN
    Theatres AS T ON T.theatre_id = S.theatre_id WHERE D.username = ?`;

    const queryResponse = await query(queryString, [username]);

    console.log(queryResponse);

    res.status(200).json({
      ...successfulResponse("Director's movies are listed successfully"),
      movies: queryResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

export async function viewMovieDetail(req, res, next) {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      next(new EmptyFieldError("Please provide a movie id"));
      return;
    }
    const queryString = `SELECT movie_id,movie_name,average_rating from Movies WHERE movie_id = ?`;

    const queryResponse = await query(queryString, [movieId]);

    console.log(queryResponse);

    res.status(200).json({
      ...successfulResponse("Movie is listed successfully"),
      movie: queryResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}
