import { query } from "../../../databaseConnection.js";
import EmptyFieldError from "../../shared/errors/EmptyField/EmptyField.js";
import DirectorNotFound from "../../shared/errors/NotFound/DirectorNotFound.js";
import MovieNotFound from "../../shared/errors/NotFound/MovieNotFound.js";
import successfulResponse from "../../shared/response/successfulResponse.js";
import DatabaseManagerNotFound from "../../shared/errors/NotFound/DatabaseManagerNotFound.js";
import AudienceNotFound from "../../shared/errors/NotFound/AudienceNotFound.js";
import BadRequest from "../../shared/errors/BadRequest/BadRequest.js";

export async function userLogin(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      next(new EmptyFieldError("Please provide the required fields."));
      return;
    }
    const queryString = `SELECT * FROM directors WHERE username = ? AND password = ?;`;

    const queryResponse = await query(queryString, [username, password]);

    if (queryResponse.length == 0) {
      next(new DirectorNotFound());
      return;
    }
    console.log(queryResponse);
    res
      .status(201)
      .json(successfulResponse("Director is logged in successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// !!!!! What is the input format of slot query? !!!!!
export async function viewAvailableTheatres(req, res, next) {
  try {
    const { date } = req.query;
    const { slots } = req.query;

    if (!(date && slots)) {
      next(new EmptyFieldError("Please provide the date and slot info."));
      return;
    }

    const queryString = `SELECT theatre_id, theatre_district, theatre_capacity
      FROM theatres
      WHERE theatre_id NOT IN (
        SELECT DISTINCT theatre_id
        FROM taken_slots
        WHERE FIND_IN_SET(slot, ?)
        AND date = ?
      )`;

    const queryResponse = await query(queryString, [slots, date]);

    console.log(queryResponse);

    res.status(200).json({
      ...successfulResponse("Available theatres are listed successfully"),
      availableTheatres: queryResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

export async function addPredecessors(req, res, next) {
  try {
    const { movie_id, pre_ids } = req.body;

    if (!(movie_id && pre_ids)) {
      next(
        new EmptyFieldError("Please provide the move id and predecessor ids.")
      );
      return;
    }
    const pre_ids_array = pre_ids.split(",");

    const queryString = `INSERT INTO predecessor (successor_id, predecessor_id)
      VALUES (?, ?);
      `;

    for (let i = 0; i < pre_ids_array.length; i++) {
      console.log(movie_id, pre_ids_array[i]);
      await query(queryString, [movie_id, pre_ids_array[i]]);
    }

    res
      .status(201)
      .json(successfulResponse("Predecessor(s) are added successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addSession(req, res, next) {
  try {
    const {
      theatre_id,
      theatre_name,
      theatre_district,
      theatre_capacity,
      movie_id,
      movie_name,
      duration,
      username,
      genre_list,
      predecessors,
      session_id,
      time_slot,
      date,
    } = req.body;

    console.log(theatre_id, movie_id, session_id, time_slot, date);
    if (!(theatre_id && movie_id && session_id && time_slot && date)) {
      next(new EmptyFieldError("Please provide the necessary fields."));
      return;
    }

    const movieIDString = `SELECT movie_id FROM movies WHERE movie_id = ?;
      `;
    const movieIDResponse = await query(movieIDString, [movie_id]);

    const theatreIDString = `SELECT theatre_id FROM theatres WHERE theatre_id = ?;
    `;
    const theatreIDResponse = await query(theatreIDString, [theatre_id]);

    if (movieIDResponse.length == 0) {
      if (!(movie_name && duration && username && genre_list)) {
        next(new EmptyFieldError("Please provide the fields of the movie."));
        return;
      } else {
        const movieInsertString = `INSERT INTO movies(movie_id,movie_name,duration,director) values (?,?,?,?);
      `;
        await query(movieInsertString, [
          movie_id,
          movie_name,
          duration,
          username,
        ]);

        const genre_array = genre_list.split(",");

        const queryString = `INSERT INTO type_of (movie_id, genre_id)
          VALUES (?, ?);
          `;

        for (let i = 0; i < genre_array.length; i++) {
          await query(queryString, [movie_id, genre_array[i]]);
        }

        if (predecessors) {
          const pre_ids_array = predecessors.split(",");

          const queryString = `INSERT INTO predecessor (successor_id, predecessor_id)
            VALUES (?, ?);
            `;

          for (let i = 0; i < pre_ids_array.length; i++) {
            console.log(movie_id, pre_ids_array[i]);
            await query(queryString, [movie_id, pre_ids_array[i]]);
          }
        }
      }
    }

    if (theatreIDResponse.length == 0) {
      if (!(theatre_name && theatre_district && theatre_capacity)) {
        next(new EmptyFieldError("Please provide the fields of the theatre."));
        return;
      } else {
        const theatreInsertString = `INSERT INTO theatres(theatre_id,theatre_name,theatre_district,theatre_capacity) values (?,?,?,?);
      `;
        await query(theatreInsertString, [
          theatre_id,
          theatre_name,
          theatre_district,
          theatre_capacity,
        ]);
      }
    }

    const movieSessionString = `INSERT INTO movie_sessions(session_id,movie_id,theatre_id,time_slot,date) values (?,?,?,?,?);
      `;
    const movieSessionResponse = await query(movieSessionString, [
      session_id,
      movie_id,
      theatre_id,
      time_slot,
      date,
    ]);

    res
      .status(201)
      .json(successfulResponse("Movie session is added successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function viewAudiences(req, res, next) {
  try {
    const { id } = req.query;

    console.log("this is movie id: ", id);

    if (!id) {
      next(new EmptyFieldError("Please provide the movie id."));
      return;
    }

    const queryString = `SELECT username, name, surname
      FROM audience
      WHERE username IN (
      SELECT username 
      FROM bought 
      WHERE session_id IN (
        SELECT session_id 
        FROM movie_sessions 
        WHERE movie_id = ?
      ));`;

    const queryResponse = await query(queryString, [id]);

    console.log(queryResponse);

    res.status(200).json({
      ...successfulResponse(
        "Audiences that watched the film are listed successfully"
      ),
      audiences: queryResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

export async function viewMoviesOfDirector(req, res, next) {
  try {
    const { username } = req.query;

    console.log("this is username: ", username);

    if (!username) {
      next(new EmptyFieldError("Please provide the director's username."));
      return;
    }

    const queryString = `SELECT movies.movie_id, movie_name, theatre_id, time_slot, p.predecessors_list
      FROM movies
      INNER JOIN movie_sessions ON movies.movie_id = movie_sessions.movie_id
      LEFT JOIN (
          SELECT successor_id, GROUP_CONCAT(predecessor_id ORDER BY predecessor_id ASC) AS predecessors_list
          FROM predecessor
          GROUP BY successor_id
      ) AS p ON movies.movie_id = p.successor_id
      WHERE movies.director = ?;`;

    const queryResponse = await query(queryString, [username]);

    if (queryResponse.affectedRows == 0) {
      next(new DirectorNotFound());
      return;
    }

    console.log(queryResponse);

    res.status(200).json({
      ...successfulResponse("Films of the director are listed successfully"),
      films: queryResponse,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

export async function updateMovieName(req, res, next) {
  try {
    const { movie_id, movie_name, username } = req.body;

    if (!(movie_id && movie_name && username)) {
      next(new EmptyFieldError("Please provide the required fields."));
      return;
    }

    let queryString =
      "SELECT COUNT(*) as Count FROM Movies WHERE director=? AND movie_id = ?";

    let queryResponse = await query(queryString, [username, movie_id]);

    if (queryResponse[0].Count == 0) {
      next(
        new BadRequest(
          "Either you do not direct this film or there is no film with this id!"
        )
      );
      return;
    }

    queryString = `UPDATE movies SET movie_name = ? WHERE movie_id = ?;`;

    queryResponse = await query(queryString, [movie_name, movie_id]);

    if (queryResponse.affectedRows == 0) {
      next(new MovieNotFound());
      return;
    }

    res
      .status(200)
      .json(successfulResponse("Movie name is changed successfully."));
  } catch (error) {
    console.log(error);

    next(error);
  }
}
