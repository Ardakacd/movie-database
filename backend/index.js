import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectToDb from "./databaseConnection.js";
import { createTables } from "./initialDbSetup.js";
import router from "./src/routes.js";
import errorConsts from "./src/shared/errors/const.js";
import Error from "./src/shared/errors/Error.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

connectToDb();
await createTables();

const baseUrl = "/api/v1";

app.use(baseUrl, router);

//global error handler
app.use((err, _req, res, _next) => {
  console.log(err);
  if (err instanceof Error) {
    const { id, statusText, statusCode, reason } = err;
    res.status(statusCode).json({ id, status: statusText, message: reason });
    return;
  }

  if (err.sqlMessage != undefined) {
    res.status(500).json({
      id: errorConsts.DatabaseError,
      type: "error",
      message: err.sqlMessage,
    });
  }

  res.status(400).json({
    id: errorConsts.UnknownError,
    type: "error",
    message: "An error occured!",
  });
});

app.listen(3001, () => {
  console.log(`Api is running on port ${3001}`);
});
