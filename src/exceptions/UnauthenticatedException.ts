import { BaseError } from "./BaseError.ts";

export class UnauthenticatedException extends BaseError {
  constructor(message?: string) {
    super(message || '', 401); // Вызов конструктора BaseError с сообщением
    Object.setPrototypeOf(this, UnauthenticatedException.prototype); // Явно устанавливаем прототип
  }
}
