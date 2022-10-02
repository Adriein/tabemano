import { PricingModel } from "../../src/Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { RoleModel } from "../../src/Shared/Infrastructure/Persistance/Model/RoleModel";
import { SUBSCRIPTION_STATUS } from "../../src/Backoffice/Shared/constants";
import { SubscriptionModel } from "../../src/Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { CLIENT_ROLE } from "../../src/Shared/Domain/constants";
import { CryptoService } from "../../src/Shared/Domain/Services/CryptoService";
import { DateVo } from "../../src/Shared/Domain/Vo/Date.vo";
import { Email } from "../../src/Shared/Domain/Vo/Email.vo";
import { ID } from "../../src/Shared/Domain/Vo/Id.vo";
import { Name } from "../../src/Shared/Domain/Vo/Name.vo";
import { Password } from "../../src/Shared/Domain/Vo/Password.vo";
import { RoleType } from "../../src/Shared/Domain/Vo/RoleType";
import { Time } from "../../src/Shared/Infrastructure/Helper/Time";
import Database from "../../src/Shared/Infrastructure/Persistance/Database";
import { TenantModel } from "../../src/Shared/Infrastructure/Persistance/Model/TenantModel";
import { UserModel } from "../../src/Shared/Infrastructure/Persistance/Model/UserModel";
import { fakeData } from './dev-data';

require('dotenv').config();

const crypto = new CryptoService();

async function main() {
  const pricingName = [ 'monthly', 'quarterly' ];
  const fakeUserCreationDates = [ '2021-03-04', '2021-06-20', '2021-11-01' ];

  const database = await Database.instance().initialize();

  const tenantRepository = database.getRepository(TenantModel);
  const userRepository = database.getRepository(UserModel);
  const roleRepository = database.getRepository(RoleModel);
  const pricingRepository = database.getRepository(PricingModel);
  const subscriptionRepository = database.getRepository(SubscriptionModel);

  const admin = await tenantRepository.findOne({ where: { email: new Email(process.env.ADMIN_EMAIL!) } });
  const clientRole = await roleRepository.findOne({ where: { type: new RoleType(CLIENT_ROLE) } });

  for (const data of fakeData) {
    const randomPricingIndex = Math.floor(Math.random() * 2);
    const randomCreationDateIndex = Math.floor(Math.random() * 3);

    const pricing = await pricingRepository.findOne({ where: { name: pricingName[randomPricingIndex] } });
    const userCreationDate = fakeUserCreationDates[randomCreationDateIndex];

    const validTo = Time.add(new Date(userCreationDate), pricing!.duration);

    const id = ID.generate();
    const password = await crypto.hash(Password.generate().value);

    const subscriptionId = ID.generate();
    const configId = ID.generate();

    await userRepository.save(
      {
        id: id,
        name: new Name(data.username),
        email: new Email(data.email),
        password: new Password(password),
        tenantId: admin!.id,
        isActive: true,
        roleId: clientRole!.id,
        configId: configId,
        config: {
          id: configId,
          lang: 'ES',
          userId: id,
          sendWarnings: true,
          sendNotifications: true,
          createdAt: DateVo.now().value,
          updatedAt: DateVo.now().value
        },
        role: {
          id: clientRole!.id
        },
        tenant: {
          id: admin!.id
        },
        createdAt: DateVo.now().value,
        updatedAt: DateVo.now().value
      }
    );

    await subscriptionRepository.save({
      id: subscriptionId,
      pricingId: pricing!.id,
      isActive: false,
      isExpired: true,
      paymentDate: new DateVo(userCreationDate),
      validTo: new DateVo(validTo),
      userId: id,
      duration: pricing!.duration,
      pricingName: pricing!.name,
      price: pricing!.price,
      tenantId: null,
      events: [
        {
          id: ID.generate(),
          event: SUBSCRIPTION_STATUS.CREATED,
          createdAt: new Date(userCreationDate),
          updatedAt: new Date(userCreationDate)
        },
        {
          id: ID.generate(),
          event: SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE,
          createdAt: Time.add(new Date(userCreationDate), pricing!.duration - 5),
          updatedAt: Time.add(new Date(userCreationDate), pricing!.duration - 5),
        },
        {
          id: ID.generate(),
          event: SUBSCRIPTION_STATUS.EXPIRED,
          createdAt: Time.add(new Date(userCreationDate), pricing!.duration),
          updatedAt: Time.add(new Date(userCreationDate), pricing!.duration),
        },
        {
          id: ID.generate(),
          event: SUBSCRIPTION_STATUS.INACTIVE,
          createdAt: Time.add(new Date(userCreationDate), pricing!.duration),
          updatedAt: Time.add(new Date(userCreationDate), pricing!.duration),
        }
      ],
      user: {
        id
      },
      createdAt: new Date(userCreationDate),
      updatedAt: new Date(userCreationDate)
    });

    const daysBetweenFirstDateAndNow = Time.diff(Time.now(), new Date(userCreationDate));

    const numberOfSubscriptions = Math.floor((daysBetweenFirstDateAndNow / pricing!.duration));

    let fakeNow = Time.add(validTo, 1);

    for (let i = 0; i < numberOfSubscriptions; i++) {
      const subscriptionExpirationDate = Time.add(new Date(fakeNow), pricing!.duration);
      const subscriptionId = ID.generate();
      if (Time.before(Time.now(), subscriptionExpirationDate)) {
        await subscriptionRepository.save({
          id: subscriptionId,
          pricingId: pricing!.id,
          isActive: true,
          isExpired: false,
          userId: id,
          paymentDate: new DateVo(fakeNow),
          validTo: new DateVo(subscriptionExpirationDate),
          duration: pricing!.duration,
          pricingName: pricing!.name,
          price: pricing!.price,
          tenantId: null,
          user: {
            id
          },
          events: [
            {
              id: ID.generate(),
              subscriptionId: subscriptionId,
              event: SUBSCRIPTION_STATUS.CREATED,
              createdAt: fakeNow,
              updatedAt: fakeNow
            }
          ],
          createdAt: fakeNow,
          updatedAt: fakeNow
        });

        break;
      }

      await subscriptionRepository.save({
        id: subscriptionId,
        pricingId: pricing!.id,
        isActive: false,
        isExpired: true,
        userId: id,
        paymentDate: new DateVo(fakeNow),
        validTo: new DateVo(subscriptionExpirationDate),
        duration: pricing!.duration,
        pricingName: pricing!.name,
        price: pricing!.price,
        tenantId: null,
        user: {
          id
        },
        events: [
          {
            id: ID.generate(),
            subscriptionId: subscriptionId,
            event: SUBSCRIPTION_STATUS.CREATED,
            createdAt: fakeNow,
            updatedAt: fakeNow
          },
          {
            id: ID.generate(),
            subscriptionId: subscriptionId,
            event: SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE,
            createdAt: Time.add(fakeNow, pricing!.duration - 5),
            updatedAt: Time.add(fakeNow, pricing!.duration - 5),
          },
          {
            id: ID.generate(),
            subscriptionId: subscriptionId,
            event: SUBSCRIPTION_STATUS.EXPIRED,
            createdAt: Time.add(fakeNow, pricing!.duration),
            updatedAt: Time.add(fakeNow, pricing!.duration),
          },
          {
            id: ID.generate(),
            subscriptionId: subscriptionId,
            event: SUBSCRIPTION_STATUS.INACTIVE,
            createdAt: Time.add(fakeNow, pricing!.duration),
            updatedAt: Time.add(fakeNow, pricing!.duration),
          }
        ],
        createdAt: fakeNow,
        updatedAt: fakeNow
      });

      fakeNow = Time.add(subscriptionExpirationDate, 1);
    }
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    console.log('FINISH DEV DATA SEEDING')
  })
