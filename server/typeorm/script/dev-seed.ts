import { PricingModel } from "../../src/Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { RoleModel } from "../../src/Backoffice/Role/Infrastructure/Persistance/Model/RoleModel";
import { SUBSCRIPTION_STATUS } from "../../src/Backoffice/Shared/constants";
import { TenantModel } from "../../src/Backoffice/Tenant/Infrastructure/Persistance/Model/TenantModel";
import { CLIENT_ROLE } from "../../src/Shared/Domain/constants";
import { CryptoService } from "../../src/Shared/Domain/Services/CryptoService";
import { DateVo } from "../../src/Shared/Domain/Vo/Date.vo";
import { Email } from "../../src/Shared/Domain/Vo/Email.vo";
import { ID } from "../../src/Shared/Domain/Vo/Id.vo";
import { Password } from "../../src/Shared/Domain/Vo/Password.vo";
import { Time } from "../../src/Shared/Infrastructure/Helper/Time";
import Database from "../../src/Shared/Infrastructure/Persistance/Database";
import { fakeData } from './dev-data';

require('dotenv').config();

const crypto = new CryptoService();

async function main() {
  const pricingName = [ 'monthly', 'quarterly' ];
  const fakeUserCreationDates = [ '2021-03-04', '2021-06-20', '2021-11-01' ];

  const database = await Database.instance().initialize();

  const userRepository = database.getRepository(TenantModel);
  const roleRepository = database.getRepository(RoleModel);
  const pricingRepository = database.getRepository(PricingModel);

  const admin = await userRepository.findOne({ where: { email: process.env.ADMIN_EMAIL! } });
  const clientRole = await roleRepository.findOne({ where: { type: CLIENT_ROLE } });

  for (const data of fakeData) {
    const randomPricingIndex = Math.floor(Math.random() * 2);
    const randomCreationDateIndex = Math.floor(Math.random() * 3);

    const pricing = await pricingRepository.findOne({ where: { name: pricingName[randomPricingIndex] } });
    const userCreationDate = fakeUserCreationDates[randomCreationDateIndex];

    const validTo = Time.add(new Date(userCreationDate), pricing.duration);

    const id = ID.generate().value;
    const password = await crypto.hash(Password.generate().value);

    const subscriptionId = ID.generate().value;
    const configId = ID.generate();

    await userRepository.save(
      {
        id,
        name: data.username,
        email: new Email(data.email),
        password,
        tenantId: admin.id,
        isActive: true,
        roleId: clientRole.id,
        configId,
        config: {
          id: configId,
          lang: 'ES',
          userId: id,
          sendWarnings: true,
          sendNotifications: true,
          createdAt: DateVo.now().value,
          updatedAt: DateVo.now().value
        },
        createdAt: DateVo.now().value,
        updatedAt: DateVo.now().value
      }
    );


    await prisma.ta_user.create({
      data: {
        us_id: id,
        us_name: data.username,
        us_email: data.email,
        us_password: password,
        us_tenant_id: admin.id,
        us_is_active: true,
        us_created_at: new Date(userCreationDate),
        us_updated_at: new Date(userCreationDate),
        us_role: {
          connect: {
            ro_id: clientRole.id,
          }
        },
        us_config: {
          create: {
            co_id: ID.generate().value,
            co_send_warnings: true,
            co_send_notifications: true,
            co_language: 'ES',
            co_created_at: new Date(userCreationDate),
            co_updated_at: new Date(userCreationDate)
          }
        },
        us_subscriptions: {
          create: {
            su_id: subscriptionId,
            su_pricing_id: pricing.id,
            su_is_active: false,
            su_is_expired: true,
            su_payment_date: new Date(userCreationDate),
            su_valid_to: validTo,
            su_duration: pricing.duration,
            su_price_name: pricing.name,
            su_price: pricing.price,
            su_events: {
              createMany: {
                data: [
                  {
                    se_id: ID.generate().value,
                    se_event: SUBSCRIPTION_STATUS.CREATED,
                    se_created_at: new Date(userCreationDate),
                    se_updated_at: new Date(userCreationDate)
                  },
                  {
                    se_id: ID.generate().value,
                    se_event: SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE,
                    se_created_at: Time.add(new Date(userCreationDate), pricing.duration - 5),
                    se_updated_at: Time.add(new Date(userCreationDate), pricing.duration - 5),
                  },
                  {
                    se_id: ID.generate().value,
                    se_event: SUBSCRIPTION_STATUS.EXPIRED,
                    se_created_at: Time.add(new Date(userCreationDate), pricing.duration),
                    se_updated_at: Time.add(new Date(userCreationDate), pricing.duration),
                  },
                  {
                    se_id: ID.generate().value,
                    se_event: SUBSCRIPTION_STATUS.INACTIVE,
                    se_created_at: Time.add(new Date(userCreationDate), pricing.duration),
                    se_updated_at: Time.add(new Date(userCreationDate), pricing.duration),
                  }
                ]
              }
            },
            su_created_at: new Date(userCreationDate),
            su_updated_at: new Date(userCreationDate)
          }
        }
      }
    });

    const daysBetweenFirstDateAndNow = Time.diff(Time.now(), new Date(userCreationDate));

    const numberOfSubscriptions = Math.floor((daysBetweenFirstDateAndNow / pricing.duration));

    let fakeNow = Time.add(validTo, 1);

    for (let i = 0; i < numberOfSubscriptions; i++) {
      const subscriptionExpirationDate = Time.add(new Date(fakeNow), pricing.duration);

      if (Time.before(Time.now(), subscriptionExpirationDate)) {
        await prisma.ta_subscription.create({
          data: {
            su_id: ID.generate().value,
            su_pricing_id: pricing.id,
            su_is_active: true,
            su_is_expired: false,
            su_user_id: id,
            su_payment_date: fakeNow,
            su_valid_to: subscriptionExpirationDate,
            su_duration: pricing.duration,
            su_price_name: pricing.name,
            su_price: pricing.price,
            su_events: {
              createMany: {
                data: [
                  {
                    se_id: ID.generate().value,
                    se_event: SUBSCRIPTION_STATUS.CREATED,
                    se_created_at: fakeNow,
                    se_updated_at: fakeNow
                  }
                ]
              }
            },
            su_created_at: fakeNow,
            su_updated_at: fakeNow,
          }
        });

        break;
      }

      await prisma.ta_subscription.create({
        data: {
          su_id: ID.generate().value,
          su_pricing_id: pricing.id,
          su_is_active: false,
          su_is_expired: true,
          su_user_id: id,
          su_payment_date: fakeNow,
          su_valid_to: subscriptionExpirationDate,
          su_duration: pricing.duration,
          su_price_name: pricing.name,
          su_price: pricing.price,
          su_events: {
            createMany: {
              data: [
                {
                  se_id: ID.generate().value,
                  se_event: SUBSCRIPTION_STATUS.CREATED,
                  se_created_at: fakeNow,
                  se_updated_at: fakeNow
                },
                {
                  se_id: ID.generate().value,
                  se_event: SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE,
                  se_created_at: Time.add(fakeNow, pricing.duration - 5),
                  se_updated_at: Time.add(fakeNow, pricing.duration - 5),
                },
                {
                  se_id: ID.generate().value,
                  se_event: SUBSCRIPTION_STATUS.EXPIRED,
                  se_created_at: Time.add(fakeNow, pricing.duration),
                  se_updated_at: Time.add(fakeNow, pricing.duration),
                },
                {
                  se_id: ID.generate().value,
                  se_event: SUBSCRIPTION_STATUS.INACTIVE,
                  se_created_at: Time.add(fakeNow, pricing.duration),
                  se_updated_at: Time.add(fakeNow, pricing.duration),
                }
              ]
            }
          },
          su_created_at: fakeNow,
          su_updated_at: fakeNow,
        }
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

  })
