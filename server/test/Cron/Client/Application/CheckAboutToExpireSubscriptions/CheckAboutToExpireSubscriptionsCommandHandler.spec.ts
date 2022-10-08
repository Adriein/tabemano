import { Result } from '@badrap/result';
import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { Subscription } from '../../../../../src/Cron/Client/Domain/Entity/Subscription';
import { CheckAboutToExpireSubscriptionsCommand } from '../../../../../src/Cron/Client/Application/CheckAboutToExpireSubscriptions/CheckAboutToExpireSubscriptionsCommand';
import { CheckAboutToExpireSubscriptionsCommandHandler } from '../../../../../src/Cron/Client/Application/CheckAboutToExpireSubscriptions/CheckAboutToExpireSubscriptionsCommandHandler';
import { SubscriptionAboutToExpireDomainEvent } from '../../../../../src/Cron/Client/Application/CheckAboutToExpireSubscriptions/SubscriptionAboutToExpireDomainEvent';
import { Client } from '../../../../../src/Cron/Client/Domain/Entity/Client';
import { PgClientRepository } from '../../../../../src/Cron/Client/Infrastructure/Persistance/Repository/PgClientRepository';
import { BackGroundJob } from '../../../../../src/Cron/Shared/Domain/Entity/BackGroundJob';
import { PgBackGroundJobRepository } from '../../../../../src/Cron/Shared/Infrastructure/Persistance/Repository/PgBackGroundJobRepository';
import { ClientObjectMother } from '../../../Shared/ClientObjectMother';

describe('CheckAboutToExpireSubscriptionsCommandHandler', () => {
  let handler: CheckAboutToExpireSubscriptionsCommandHandler;
  let clientRepository: PgClientRepository;
  let backgroundJobRepository: PgBackGroundJobRepository;
  let eventBus: EventBus;
  let client: Client;
  let subscription: Subscription;

  beforeEach(async () => {
    jest.resetAllMocks();

    client = ClientObjectMother.create().withAboutToExpireSubscription().build();
    subscription = client.activeSubscription();

    const cronModule = await Test.createTestingModule({
      providers: [CheckAboutToExpireSubscriptionsCommandHandler],
    })
      .useMocker(token => {
        if (typeof token === 'function') {
          switch (token.name) {
            case 'EventBus':
              return { publish: jest.fn() };
          }

          return;
        }

        switch (token) {
          case 'IClientRepository':
            return { find: jest.fn().mockReturnValue(Promise.resolve(Result.ok([client]))) };
          case 'IBackGroundJobRepository':
            return { save: jest.fn() };
        }
      })
      .compile();

    handler = cronModule.get(CheckAboutToExpireSubscriptionsCommandHandler);
    clientRepository = cronModule.get<PgClientRepository>('IClientRepository');
    backgroundJobRepository = cronModule.get<PgBackGroundJobRepository>('IBackGroundJobRepository');
    eventBus = cronModule.get<EventBus>(EventBus);
  });

  it('should register a backgroundJob', async () => {
    jest.spyOn(backgroundJobRepository, 'save');

    await handler.execute(new CheckAboutToExpireSubscriptionsCommand());

    expect(backgroundJobRepository.save).toBeCalledWith(expect.any(BackGroundJob));
    expect(backgroundJobRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should retrieve the active subscription', async () => {
    jest.spyOn(client, 'activeSubscription');

    await handler.execute(new CheckAboutToExpireSubscriptionsCommand());

    expect(client.activeSubscription).toHaveBeenCalledTimes(1);
  });

  it('given the conditions should publish a subscription about to expire event', async () => {
    jest.spyOn(subscription, 'checkIsAboutToExpire');
    jest.spyOn(client, 'tenantWarningDays');
    jest.spyOn(client, 'canSendWarnings');
    jest.spyOn(eventBus, 'publish');

    await handler.execute(new CheckAboutToExpireSubscriptionsCommand());

    expect(client.canSendWarnings()).toBe(true);
    expect(client.tenantWarningDays()).toBe(5);

    expect(subscription.checkIsAboutToExpire()).toBe(true);

    expect(eventBus.publish).toHaveBeenCalledTimes(1);
    expect(eventBus.publish).toBeCalledWith(expect.any(SubscriptionAboutToExpireDomainEvent));
  });
});
