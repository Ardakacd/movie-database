import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newpass",
  database: "movie_db",
});

function connectToDb() {
  connection.connect();
  console.log("Successfully connected to db!");
}

export default connectToDb;
