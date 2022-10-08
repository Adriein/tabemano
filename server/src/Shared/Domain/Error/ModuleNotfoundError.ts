import { DomainError } from './DomainError';

export class ModuleNotFoundError extends DomainError {
  statusCode = 400;

  constructor() {
    super('No module found with this criteria');

    Object.setPrototypeOf(this, ModuleNotFoundError.prototype);
  }

  serialize() {
    return [{ message: this.message, key: 'module_format_error' }];
  }
}
