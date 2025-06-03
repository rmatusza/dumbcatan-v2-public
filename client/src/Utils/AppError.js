export class AppError extends Error {
  constructor(message, status) {
    super(message);

    this.status = status;

    /// sets the .name property of the error instance to "AppError"
    /// when logging or stringifying the error, you now see "AppError" instead of just "Error"
    this.name = this.constructor.name;

    /// attaches a .stack property to the error instance
    /// -> makes it so that a stack trace will be attached to this error that can be looked at on the error object (err.stack)
    /// this.constructor makes it so that stack trace starts from the point where AppError was instantiated, not from inside the AppError constructor itself
    /// -> makes the error trace cleaner and more focused on the source of the problem
    Error.captureStackTrace(this, this.constructor);
  }
}