import Error from "../Error.js";
import errorIds from "../const.js";

class PasswordCompareError extends Error {
  constructor() {
    super();
    super.id = errorIds.PasswordCompareError;
    super.reason = "Passwords is wrong!";
    super.statusCode = 400;
  }
}

export default PasswordCompareError;
