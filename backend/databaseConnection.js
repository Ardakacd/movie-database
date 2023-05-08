import mysql from "mysql2";
import { promisify } from "util";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newpass",
  database: "movie_db",
  multipleStatements: true,
});

export const query = promisify(connection.query).bind(connection);

function connectToDb() {
  connection.connect();

  console.log("Successfully connected to db!");
}

export default connectToDb;
