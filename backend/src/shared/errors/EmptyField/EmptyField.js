import Error from "../Error.js";
import errorIds from "../const.js";

class EmptyField extends Error {
  constructor() {
    super();
    super.id = errorIds.EmptyField;
    super.reason = "You should provide all the necessary fields";
    super.statusCode = 400;
  }
}

export default EmptyField;
