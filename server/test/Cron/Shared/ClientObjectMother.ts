import { Subscription } from "../../../src/Cron/Client/Domain/Entity/Subscription";
import { Client } from "../../../src/Cron/Client/Domain/Entity/Client";
import { Config } from "../../../src/Cron/Client/Domain/Entity/Config";
import { DateVo } from "../../../src/Shared/Domain/Vo/Date.vo";
import { Email } from "../../../src/Shared/Domain/Vo/Email.vo";
import { ID } from "../../../src/Shared/Domain/Vo/Id.vo";
import { Name } from "../../../src/Shared/Domain/Vo/Name.vo";
import { Time } from "../../../src/Shared/Infrastructure/Helper/Time";

export type SubscriptionConfigParams = { active: boolean, expired: boolean };

export class ClientObjectMother {
  private _clientId: ID = ID.generate();
  private _subscription!: Subscription;

  private constructor() {}

  public static create(): ClientObjectMother {
    return new ClientObjectMother();
  }

  public withAboutToExpireSubscription(): this {
    const paymentDate = Time.subtract(DateVo.now().value, 25);
    this._subscription = new Subscription(
      ID.generate(),
      this._clientId,
      ID.generate(),
      new DateVo(paymentDate),
      new DateVo(Time.add(paymentDate, 30)),
      true,
      false,
      'Mock pricing',
      30,
      paymentDate,
      paymentDate
    );

    return this;
  }

  public withExpiredSubscription(config: SubscriptionConfigParams): this {
    const paymentDate = Time.subtract(DateVo.now().value, 40);
    this._subscription = new Subscription(
      ID.generate(),
      this._clientId,
      ID.generate(),
      new DateVo(paymentDate),
      new DateVo(Time.add(paymentDate, 30)),
      config.active,
      config.expired,
      'Mock pricing',
      30,
      paymentDate,
      paymentDate
    );

    return this;
  }

  public build(): Client {
    const clientId = ID.generate();
    return new Client(
      clientId,
      new Name('Elver Galarga'),
      new Email('elvergalarga@gmail.com'),
      new Config(
        ID.generate(),
        true,
        true
      ),
      this._subscription,
      5,
      true,
    );
  }
}