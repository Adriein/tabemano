export abstract class DomainError extends Error {
  abstract statusCode: number;

  protected constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }

  abstract serialize(): { message: string; key: string; }[];
}