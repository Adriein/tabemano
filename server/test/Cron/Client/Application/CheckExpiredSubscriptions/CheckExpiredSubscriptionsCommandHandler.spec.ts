import { Test } from '@nestjs/testing';
import { PgClientRepository } from "../../../../../src/Cron/Client/Infrastructure/Persistance/Repository/PgClientRepository";
import { BackGroundJob } from "../../../../../src/Cron/Shared/Domain/Entity/BackGroundJob";
import { PgBackGroundJobRepository } from "../../../../../src/Cron/Shared/Infrastructure/Persistance/Repository/PgBackGroundJobRepository";
import { TypeOrmModule } from "../../../../../src/Shared/Infrastructure/Persistance/TypeOrmModule";

describe('CheckExpiredSubscriptionsCommandHandler', () => {
  let clientRepository: PgClientRepository;
  let backgroundJobRepository: PgBackGroundJobRepository;
  const expiredSubscriptionBackGroundJob = BackGroundJob.expiredSubscription();

  beforeEach(async () => {
    const cronModule = await Test.createTestingModule({
      imports: [ TypeOrmModule ],
      providers: [
        {
          provide: 'IClientRepository',
          useClass: PgClientRepository,
        },
        {
          provide: 'IBackGroundJobRepository',
          useClass: PgBackGroundJobRepository,
        }
      ],
    }).compile();

    clientRepository = cronModule.get<PgClientRepository>(PgClientRepository);
    backgroundJobRepository = cronModule.get<PgBackGroundJobRepository>(PgBackGroundJobRepository);
  });

  it('should register a backgroundJob', async () => {
    jest.spyOn(expiredSubscriptionBackGroundJob, 'init');
    jest.spyOn(expiredSubscriptionBackGroundJob, 'end');
    jest.spyOn(backgroundJobRepository, 'save');

    expect(backgroundJobRepository.save).toBeCalledWith(BackGroundJob);

    expect(backgroundJobRepository.save).toBeCalledTimes(1);

    expect(expiredSubscriptionBackGroundJob.init).toBeCalledTimes(1);
    expect(expiredSubscriptionBackGroundJob.end).toBeCalledTimes(1);
  });

  it('should mark a subscription as expired', async () => {

  });
});