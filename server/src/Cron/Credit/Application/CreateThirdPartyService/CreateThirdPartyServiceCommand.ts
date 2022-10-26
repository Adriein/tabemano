import { ICommand } from '@nestjs/cqrs';
import { CreateThirdPartyServiceApiRequest } from 'Cron/Credit/Infrastructure/Controller/CreateThirdPartyServiceController/CreateThirdPartyServiceApiRequest';

export class CreateThirdPartyServiceCommand implements ICommand {
  public static fromJson(json: CreateThirdPartyServiceApiRequest): CreateThirdPartyServiceCommand {
    return new CreateThirdPartyServiceCommand(
      json.name,
      json.remainingCredit,
      json.minRemainingCreditBeforeNotifying,
      json.notify
    );
  }

  constructor(
    private readonly _name: string,
    private readonly _remainingCredit: number,
    private readonly _minRemainingCreditBeforeNotifying: number,
    private readonly _notify: boolean
  ) {}

  public get name(): string {
    return this._name;
  }

  public get remainingCredit(): number {
    return this._remainingCredit;
  }

  public get minRemainingCreditBeforeNotifying(): number {
    return this._minRemainingCreditBeforeNotifying;
  }

  public get notify(): boolean {
    return this._notify;
  }
}
