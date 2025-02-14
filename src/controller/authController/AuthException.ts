

export class UserNotFoundError extends Error {
    constructor(message: string = "User not found") {
      super(message);
      this.name = "User not found";
    }
  }
  
  export class PasswordMismatchError extends Error {
    constructor(message: string = "Password does not match") {
      super(message);
      this.name = "Password does not match";
    }
  }
  export class ServerError extends Error {
    constructor(message: string = "Password does not match") {
      super(message);
      this.name = "Password does not match";
    }
  }
  