import NotFound from "./NotFound.js";
import errorIds from "../const.js";

class DatabaseManagerNotFound extends NotFound {
  constructor() {
    super();
    super.reason = "Database Manager Not Found!";
    super.id = errorIds.DatabaseManagerNotFound;
    super.statusCode = 404;
  }
}

export default DatabaseManagerNotFound;
