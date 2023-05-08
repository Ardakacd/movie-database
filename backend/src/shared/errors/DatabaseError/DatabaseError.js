import Error from "../Error.js";
import errorIds from "../const.js";

class DatabaseError extends Error {
  constructor(reason) {
    super();
    super.id = errorIds.DatabaseError;
    super.reason = reason ? reason : "Database Error!";
    super.statusCode = 400;
  }
}

export default DatabaseError;
