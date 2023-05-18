import { query } from "../../../databaseConnection.js";
import AudienceNotFound from "../../shared/errors/NotFound/AudienceNotFound.js";
import successfulResponse from "../../shared/response/successfulResponse.js";
import EmptyFieldError from "../../shared/errors/EmptyField/EmptyField.js";

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      next(new EmptyFieldError());
      return;
    }

    const queryString = `SELECT * FROM Audience WHERE username = ? AND password = ?;`;

    const queryResponse = await query(queryString, [username, password]);

    if (queryResponse.length == 0) {
      next(new AudienceNotFound());
      return;
    }

    console.log(queryResponse);

    res
      .status(201)
      .json(successfulResponse("Audience is logged in successfully"));
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function listMovies(req, res, next) {
  try {
    const queryString = `SELECT M.movie_id,M.movie_name,D.surname AS director_surname,P.platform_name,S.theatre_id,S.time_slot FROM Movies AS M INNER JOIN Directors AS D ON M.director = D.username 
    INNER JOIN Movie_Sessions AS S ON M.movie_id = S.movie_id INNER JOIN Rating_Platform AS P ON P.platform_id = D.platform_id`;

    let movies = await query(queryString);

    movies = await Promise.all(
      movies.map(async (movie) => {
        const movie_id = movie.movie_id;
        const queryStr =
          "SELECT predecessor_id FROM Predecessor WHERE successor_id = ?";
        const predecessor_ids = await query(queryStr, [movie_id]);
        let stringPredessor = "";
        for (let item of predecessor_ids) {
          stringPredessor += item.predecessor_id + ", ";
        }
        stringPredessor = stringPredessor.substr(0, stringPredessor.length - 2);
        movie = { ...movie, predecessor_list: stringPredessor };
        return movie;
      })
    );

    res.status(200).json({
      ...successfulResponse("Movies are listed successfully"),
      movies,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function buyMovieTicket(req, res, next) {
  try {
    const { username, sessionId } = req.body;

    if (!(username && sessionId)) {
      next(new EmptyFieldError());
      return;
    }

    const queryString = `INSERT INTO Bought(username,session_id) VALUES(?,?);`;

    let queryResponse = await query(queryString, [username, sessionId]);

    console.log(queryResponse);

    res
      .status(201)
      .json(
        successfulResponse(
          `You succesfully buy a ticket from session_id: ${sessionId}`
        )
      );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function listTickets(req, res, next) {
  try {
    const { username } = req.body;

    if (!username) {
      next(new EmptyFieldError("Please provide a username"));
      return;
    }

    const queryString = `SELECT M.movie_id,M.movie_name,S.session_id,M.average_rating AS overall_rating FROM BOUGHT AS B INNER JOIN 
    Movie_Sessions AS S ON B.session_id = S.session_id INNER JOIN Movies AS M ON S.movie_id = M.movie_id WHERE B.username = ? `;

    let tickets = await query(queryString, [username]);

    tickets = await Promise.all(
      tickets.map(async (ticket) => {
        const movie_id = ticket.movie_id;
        const queryStr =
          "SELECT rating FROM Ratings WHERE username = ? AND movie_id= ? ";
        let rating = await query(queryStr, [username, movie_id]);

        if (!rating || (Array.isArray(rating) && rating.length == 0)) {
          rating = null;
        }
        ticket = { ...ticket, rating };
        return ticket;
      })
    );

    console.log(tickets);

    res.status(201).json({
      ...successfulResponse(`All the tickets are listed successfully`),
      tickets,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
