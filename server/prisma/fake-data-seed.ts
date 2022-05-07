import { SUBSCRIPTION_STATUS } from "../src/Backoffice/Shared/constants";
import { fakeData } from './data';
import { PrismaClient } from '@prisma/client'
import { ID } from "../src/Shared/Domain/Vo/Id.vo";
import { CryptoService } from "../src/Shared/Domain/Services/CryptoService";
import { Password } from "../src/Shared/Domain/Vo/Password.vo";
import { Time } from "../src/Shared/Infrastructure/Helper/Time";

const prisma = new PrismaClient()
const crypto = new CryptoService();

async function main() {
  const pricingName = [ 'monthly', 'quarterly' ];
  const fakeUserCreationDates = [ '2021-03-04', '2021-06-20', '2021-11-01' ];
  const admin = await prisma.ta_user.findUnique({ where: { us_email: process.env.ADMIN_EMAIL! } });
  const [ role ] = await prisma.ta_role.findMany({ where: { ro_type: 'client' } });

  for (const data of fakeData) {
    const randomPricingIndex = Math.floor(Math.random() * 2);
    const randomCreationDateIndex = Math.floor(Math.random() * 3);

    const [ pricing ] = await prisma.ta_pricing.findMany({ where: { pr_name: pricingName[randomPricingIndex] } });
    const userCreationDate = fakeUserCreationDates[randomCreationDateIndex];

    const validTo = Time.add(new Date(userCreationDate), pricing.pr_duration);

    const id = ID.generate().value;
    const password = await crypto.hash(Password.generate().value);

    const subscriptionId = ID.generate().value;


    await prisma.ta_user.create({
      data: {
        us_id: id,
        us_name: data.username,
        us_email: data.email,
        us_password: password,
        us_tenant_id: admin!.us_id,
        us_is_active: true,
        us_created_at: new Date(userCreationDate),
        us_updated_at: new Date(userCreationDate),
        us_role: {
          connect: {
            ro_id: role!.ro_id,
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
            su_pricing_id: pricing!.pr_id,
            su_is_active: false,
            su_is_expired: true,
            su_payment_date: new Date(userCreationDate),
            su_valid_to: validTo,
            su_duration: pricing!.pr_duration,
            su_price_name: pricing!.pr_name,
            su_price: pricing!.pr_price,
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
                    se_created_at: Time.add(new Date(userCreationDate), pricing.pr_duration - 5),
                    se_updated_at: Time.add(new Date(userCreationDate), pricing.pr_duration - 5),
                  },
                  {
                    se_id: ID.generate().value,
                    se_event: SUBSCRIPTION_STATUS.EXPIRED,
                    se_created_at: Time.add(new Date(userCreationDate), pricing.pr_duration),
                    se_updated_at: Time.add(new Date(userCreationDate), pricing.pr_duration),
                  },
                  {
                    se_id: ID.generate().value,
                    se_event: SUBSCRIPTION_STATUS.INACTIVE,
                    se_created_at: Time.add(new Date(userCreationDate), pricing.pr_duration),
                    se_updated_at: Time.add(new Date(userCreationDate), pricing.pr_duration),
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

    const numberOfSubscriptions = Math.floor((daysBetweenFirstDateAndNow / pricing.pr_duration));

    let fakeNow = Time.add(validTo, 1);

    for (let i = 0; i < numberOfSubscriptions; i++) {
      const subscriptionExpirationDate = Time.add(new Date(fakeNow), pricing.pr_duration);

      if (Time.before(Time.now(), subscriptionExpirationDate)) {
        await prisma.ta_subscription.create({
          data: {
            su_id: ID.generate().value,
            su_pricing_id: pricing!.pr_id,
            su_is_active: true,
            su_is_expired: false,
            su_user_id: id,
            su_payment_date: fakeNow,
            su_valid_to: subscriptionExpirationDate,
            su_duration: pricing!.pr_duration,
            su_price_name: pricing!.pr_name,
            su_price: pricing!.pr_price,
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
          su_pricing_id: pricing!.pr_id,
          su_is_active: false,
          su_is_expired: true,
          su_user_id: id,
          su_payment_date: fakeNow,
          su_valid_to: subscriptionExpirationDate,
          su_duration: pricing!.pr_duration,
          su_price_name: pricing!.pr_name,
          su_price: pricing!.pr_price,
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
                  se_created_at: Time.add(fakeNow, pricing.pr_duration - 5),
                  se_updated_at: Time.add(fakeNow, pricing.pr_duration - 5),
                },
                {
                  se_id: ID.generate().value,
                  se_event: SUBSCRIPTION_STATUS.EXPIRED,
                  se_created_at: Time.add(fakeNow, pricing.pr_duration),
                  se_updated_at: Time.add(fakeNow, pricing.pr_duration),
                },
                {
                  se_id: ID.generate().value,
                  se_event: SUBSCRIPTION_STATUS.INACTIVE,
                  se_created_at: Time.add(fakeNow, pricing.pr_duration),
                  se_updated_at: Time.add(fakeNow, pricing.pr_duration),
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
    await prisma.$disconnect()
  })