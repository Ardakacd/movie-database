import NotFound from "./NotFound.js";

class MovieNotFound extends NotFound {
  constructor() {
    super();
    super.reason = "Movie Not Found!";
  }
}

export default MovieNotFound;