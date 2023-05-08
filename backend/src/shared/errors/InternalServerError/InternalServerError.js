import Error from "../Error.js";
import errorIds from "../const.js";

class InternalServerError extends Error {
  constructor() {
    super();
    super.id = errorIds.InternalServer;
    super.reason = "Internal server error occured!";
    super.statusCode = 500;
  }
}

export default InternalServerError;
