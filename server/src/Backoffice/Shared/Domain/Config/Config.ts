import { LANG_ES } from "Backoffice/Shared/constants";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Config {
  public static build(userId: ID, sendNotifications: boolean = false, sendWarnings: boolean = false) {
    return new Config(ID.generate(), userId, LANG_ES, sendNotifications, sendWarnings);
  }

  constructor(
    public readonly id: ID,
    public readonly userId: ID,
    public lang: string,
    public sendNotifications: boolean = false,
    public sendWarnings: boolean = false,
  ) {
  }

  public activateWarnings(): void {
    this.sendWarnings = true;
  }

  public deactivateWarnings(): void {
    this.sendWarnings = false;
  }

  public activateNotifications(): void {
    this.sendNotifications = true;
  }

  public deactivateNotifications(): void {
    this.sendNotifications = false;
  }

  public changeLanguage(language: string): void {
    this.lang = language
  }
}