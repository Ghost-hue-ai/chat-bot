class ApiError extends Error {
  constructor(message, status = 404, success = false) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export { ApiError };
