import NotFound from "./NotFound.js";

class UserNotFound extends NotFound {
  constructor() {
    super();
    super.reason = "User Not Found!";
  }
}

export default UserNotFound;
