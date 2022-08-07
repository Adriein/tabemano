import { ID } from "Shared/Domain/Vo/Id.vo";

export class Config {
  constructor(
    public readonly id: ID,
    public sendNotifications: boolean = false,
    public sendWarnings: boolean = false,
  ) {}

  public activateNotifications(): void {
    this.sendNotifications = true;
  }

  public deactivateNotifications(): void {
    this.sendNotifications = false;
  }
}