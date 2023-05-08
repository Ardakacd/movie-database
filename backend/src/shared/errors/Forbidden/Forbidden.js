import Error from "../Error.js";
import errorIds from "../const.js";

class Forbidden extends Error {
  constructor() {
    super();
    super.id = errorIds.Forbidden;
    super.reason = "Forbidden!";
    super.statusCode = 403;
  }
}

export default Forbidden;
