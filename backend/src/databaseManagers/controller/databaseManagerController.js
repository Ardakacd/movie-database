import { query } from "../../../databaseConnection.js";
import EmptyFieldError from "../../shared/errors/EmptyField/EmptyField.js";
import DatabaseManagerNotFound from "../../shared/errors/NotFound/DatabaseManagerNotFound.js";
import successfulResponse from "../../shared/response/successfulResponse.js";
export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      next(new EmptyFieldError());
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
