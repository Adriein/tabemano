import { PricingModel } from "../../src/Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { RoleModel } from "../../src/Backoffice/Role/Infrastructure/Persistance/Model/RoleModel";
import { MONTHLY_PRICING, QUARTERLY_PRICING, YEARLY_PRICING } from "../../src/Backoffice/Shared/constants";
import { ConfigModel } from "../../src/Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel";
import { SubscriptionModel } from "../../src/Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { UserModel } from "../../src/Backoffice/Shared/Infrastructure/Persistance/Model/UserModel";
import { TenantModel } from "../../src/Backoffice/Tenant/Infrastructure/Persistance/Model/TenantModel";
import { ADMIN_ROLE, CLIENT_ROLE, TENANT_ROLE } from "../../src/Shared/Domain/constants";
import { CryptoService } from "../../src/Shared/Domain/Services/CryptoService";
import { DateVo } from "../../src/Shared/Domain/Vo/Date.vo";
import { Email } from "../../src/Shared/Domain/Vo/Email.vo";
import { ID } from "../../src/Shared/Domain/Vo/Id.vo";
import { Name } from "../../src/Shared/Domain/Vo/Name.vo";
import { Password } from "../../src/Shared/Domain/Vo/Password.vo";
import { RoleType } from "../../src/Shared/Domain/Vo/RoleType";
import { Time } from "../../src/Shared/Infrastructure/Helper/Time";
import Database from "../../src/Shared/Infrastructure/Persistance/Database";

require('dotenv').config();

const crypto = new CryptoService();

async function seed() {
  const id = ID.generate();
  const adminId = ID.generate();
  const password = await crypto.hash(process.env.ADMIN_PASSWORD!);

  const database = await Database.instance().initialize();

  const roleRepository = database.getRepository(RoleModel);
  const userRepository = database.getRepository(TenantModel);
  const pricingRepository = database.getRepository(PricingModel);
  const subscriptionRepository = database.getRepository(SubscriptionModel);
  const configRepository = database.getRepository(ConfigModel);

  /*const result = await userRepository.findOne({
   where: { name: new Name('Adria Claret') },
   relations: { config: true }
   });
   console.log(result);*/

  await roleRepository.save([
    {
      id: ID.generate(),
      type: new RoleType(CLIENT_ROLE),
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value
    },
    {
      id: ID.generate(),
      type: new RoleType(TENANT_ROLE),
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value
    },
    {
      id: adminId,
      type: new RoleType(ADMIN_ROLE),
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value
    },
  ]);

  const configId = ID.generate();
  await configRepository.save({
    id: configId,
    userId: id,
    sendNotifications: true,
    sendWarnings: true,
    lang: 'ES',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  await userRepository.save({
    id: id,
    name: new Name('Adria Claret'),
    email: new Email(process.env.ADMIN_EMAIL!),
    password: new Password(password),
    tenantId: id,
    roleId: adminId,
    isActive: true,
    config: {
      id: configId,
      userId: id,
      sendNotifications: true,
      sendWarnings: true,
      lang: 'ES',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: DateVo.now().value,
    updatedAt: DateVo.now().value
  });

  /*await pricingRepository.save([
   {
   id: ID.generate(),
   name: YEARLY_PRICING,
   tenantId: adminId,
   price: 1000,
   duration: 365
   },
   {
   id: ID.generate(),
   name: MONTHLY_PRICING,
   tenantId: adminId,
   price: 50,
   duration: 30
   },
   {
   id: ID.generate(),
   name: QUARTERLY_PRICING,
   tenantId: adminId,
   price: 150,
   duration: 90
   }
   ]);

   const validTo = Time.add(new Date(), 1000000000000);

   await subscriptionRepository.save({
   id: ID.generate(),
   isActive: true,
   isExpired: false,
   paymentDate: DateVo.now(),
   validTo: new DateVo(validTo),
   price: 1000,
   duration: 1000000000000,
   pricingName: YEARLY_PRICING,
   });*/
}

seed()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    console.error('FINISH SEEDING DB')
  })