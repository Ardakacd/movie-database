import Error from "../Error.js";
import errorIds from "../const.js";

class Unauthorized extends Error {
  constructor(message) {
    super();
    super.id = errorIds.Unauthorized;
    super.reason = message || "You are not authorized to do this action!";
    super.statusCode = 401;
  }
}

export default Unauthorized;
