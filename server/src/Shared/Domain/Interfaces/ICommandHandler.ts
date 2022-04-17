import { ICommand } from "./ICommand";

export interface ICommandHandler {
  handle(command: ICommand): Promise<void>;
}
