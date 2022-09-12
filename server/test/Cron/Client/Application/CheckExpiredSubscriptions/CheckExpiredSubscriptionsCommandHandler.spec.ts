import { Result } from "@badrap/result";
import { EventBus } from "@nestjs/cqrs";
import { Test } from '@nestjs/testing';
import { CheckExpiredSubscriptionsCommand } from "../../../../../src/Cron/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommand";
import { CheckExpiredSubscriptionsCommandHandler } from "../../../../../src/Cron/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommandHandler";
import { SubscriptionExpired } from "../../../../../src/Cron/Client/Application/CheckExpiredSubscriptions/SubscriptionExpired";
import { Client } from "../../../../../src/Cron/Client/Domain/Entity/Client";
import { PgClientRepository } from "../../../../../src/Cron/Client/Infrastructure/Persistance/Repository/PgClientRepository";
import { BackGroundJob } from "../../../../../src/Cron/Shared/Domain/Entity/BackGroundJob";
import { PgBackGroundJobRepository } from "../../../../../src/Cron/Shared/Infrastructure/Persistance/Repository/PgBackGroundJobRepository";
import { ClientObjectMother } from "../../../Shared/ClientObjectMother";

describe('CheckExpiredSubscriptionsCommandHandler', () => {
  let handler: CheckExpiredSubscriptionsCommandHandler;
  let clientRepository: PgClientRepository;
  let backgroundJobRepository: PgBackGroundJobRepository;
  let eventBus: EventBus;
  let client: Client;

  beforeEach(async () => {
    jest.resetAllMocks();

    client = ClientObjectMother.create().withSubscription({ active: true, expired: false }).build();

    const cronModule = await Test.createTestingModule({
      providers: [
        CheckExpiredSubscriptionsCommandHandler
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          switch (token.name) {
            case 'EventBus':
              return { publish: jest.fn() }
          }

          return;
        }

        switch (token) {
          case 'IClientRepository':
            return { find: jest.fn().mockReturnValue(Promise.resolve(Result.ok([ client ]))) };
          case 'IBackGroundJobRepository':
            return { save: jest.fn() };
        }
      })
      .compile();

    handler = cronModule.get(CheckExpiredSubscriptionsCommandHandler);
    clientRepository = cronModule.get<PgClientRepository>('IClientRepository');
    backgroundJobRepository = cronModule.get<PgBackGroundJobRepository>('IBackGroundJobRepository');
    eventBus = cronModule.get<EventBus>(EventBus);

  });

  it('should register a backgroundJob', async () => {
    jest.spyOn(backgroundJobRepository, 'save');

    await handler.execute(new CheckExpiredSubscriptionsCommand());

    expect(backgroundJobRepository.save).toBeCalledWith(expect.any(BackGroundJob));
    expect(backgroundJobRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should check if subscription is already expired', async () => {
    jest.spyOn(client, 'isActiveSubscriptionExpired');

    await handler.execute(new CheckExpiredSubscriptionsCommand());

    expect(client.isActiveSubscriptionExpired).toHaveBeenCalledTimes(1);
  });

  it('should publish an event of expired subscription', async () => {
    jest.spyOn(eventBus, 'publish');

    await handler.execute(new CheckExpiredSubscriptionsCommand());

    expect(eventBus.publish).toHaveBeenCalledTimes(1);
    expect(eventBus.publish).toBeCalledWith(expect.any(SubscriptionExpired));
  });
});