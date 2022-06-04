import { ICommand } from "@nestjs/cqrs";

export class CheckExpiredSubscriptionsCommand implements ICommand {
  constructor() {}
}