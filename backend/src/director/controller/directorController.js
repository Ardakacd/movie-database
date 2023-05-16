import { query } from "../../../databaseConnection.js";
import EmptyFieldError from "../../shared/errors/EmptyField/EmptyField.js"; 
import DirectorNotFound from "../../shared/errors/NotFound/DirectorNotFound.js";
import MovieNotFound from "../../shared/errors/NotFound/MovieNotFound.js";
import successfulResponse from "../../shared/response/successfulResponse.js";
import DatabaseManagerNotFound from "../../shared/errors/NotFound/DatabaseManagerNotFound.js";
import AudienceNotFound from "../../shared/errors/NotFound/AudienceNotFound.js";


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
        next(new EmptyFieldError("Please provide the move id and predecessor ids."));
        return;
      }
      const pre_ids_array = pre_ids.split(",");

      const queryString = `INSERT INTO predecessor (successor_id, predecessor_id)
      VALUES (?, ?);
      `;
      
      for (let i = 0; i<pre_ids_array.length ; i++) {
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


  


  export async function viewAudiences(req, res, next) {
    try {
      const { id } = req.query;

      console.log("this is moive id: ",id);

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
        ...successfulResponse("Audiences that watched the film are listed successfully"),
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

      console.log("this is username: ",username);

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
      const { movie_id, movie_name } = req.body;
  
      if (!(movie_id && movie_name)) {
        next(new EmptyFieldError("Please provide the required fields."));
        return;
      }
  
      const queryString = `UPDATE movies SET movie_name = ? WHERE movie_id = ?;`;
  
      const queryResponse = await query(queryString, [movie_name, movie_id]);
  
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

