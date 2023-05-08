import NotFound from "./NotFound.js";
import errorIds from "../const.js";

class AudienceNotFound extends NotFound {
  constructor() {
    super();
    super.reason = "Audience Not Found!";
    super.id = errorIds.AudienceNotFound;
    super.statusCode = 404;
  }
}

export default AudienceNotFound;
