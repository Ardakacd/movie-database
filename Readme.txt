* For this project we used mysql.

* In order to start up the project first you need to create a schema called movie_db from mysql workbench.(Just create a schema tables, triggers and seed data will be created by the backend)

* In the databaseConnection.js file(inside the backend folder) change the necessary fields 

export const connection = mysql.createConnection({
  host: <your host> ,
  user: <your_user>,
  password: <your_password>,
  multipleStatements: true,
  database: "movie_db",
});

* For example, export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newpass",
  multipleStatements: true,
  database: "movie_db",
});

* Go to backend folder and run "rpm run dev" to start up the api.

* Go to frontend folder and run "rpm start" to start up the frontend. Go to http://localhost:3000/ from your browser.



