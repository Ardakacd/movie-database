import NotFound from "./NotFound.js";
import errorIds from "../const.js";

class DirectorNotFound extends NotFound {
  constructor() {
    super();
    super.reason = "Director Not Found!";
    super.id = errorIds.DirectorNotFound;
    super.statusCode = 404;
  }
}

export default DirectorNotFound;
