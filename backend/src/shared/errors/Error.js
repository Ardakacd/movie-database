// base class for errors
class Error {
  id;
  statusText;
  statusCode;
  reason;
  constructor() {
    this.statusText = "error";
  }
}

export default Error;
