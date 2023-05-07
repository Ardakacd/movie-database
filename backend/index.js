import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectToDb from "./databaseConnection.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

connectToDb();

const baseUrl = "/api/v1";

//global error handler
app.use((err, _req, res, _next) => {
  console.log(err);
  if (err instanceof Error) {
    const { id, statusText, statusCode, reason } = err;
    res.status(statusCode).json({ id, status: statusText, message: reason });
    return;
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
