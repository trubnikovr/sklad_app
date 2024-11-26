// errors/BaseError.ts
export class BaseError extends Error {
  constructor(public message: string, public code?: number) {
    super(message);

    // Устанавливаем прототип явно.
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
