export class CustomerErrorResponse extends Error {
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getMessage() {
    return this.message;
  }

  getObjectToResponse() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
