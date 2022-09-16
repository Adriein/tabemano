import { DataSource } from 'typeorm';
import { PricingModel } from '../../src/Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel';
import { RoleModel } from '../../src/Backoffice/Role/Infrastructure/Persistance/Model/RoleModel';
import {
  MONTHLY_PRICING,
  QUARTERLY_PRICING,
  YEARLY_PRICING,
} from '../../src/Backoffice/Shared/constants';
import { SubscriptionModel } from '../../src/Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel';
import { TenantModel } from '../../src/Backoffice/Tenant/Infrastructure/Persistance/Model/TenantModel';
import { ADMIN_ROLE, CLIENT_ROLE, TENANT_ROLE } from '../../src/Shared/Domain/constants';
import { CryptoService } from '../../src/Shared/Domain/Services/CryptoService';
import { DateVo } from '../../src/Shared/Domain/Vo/Date.vo';
import { Email } from '../../src/Shared/Domain/Vo/Email.vo';
import { ID } from '../../src/Shared/Domain/Vo/Id.vo';
import { Name } from '../../src/Shared/Domain/Vo/Name.vo';
import { Password } from '../../src/Shared/Domain/Vo/Password.vo';
import { RoleType } from '../../src/Shared/Domain/Vo/RoleType';
import { Time } from '../../src/Shared/Infrastructure/Helper/Time';
import Database from '../../src/Shared/Infrastructure/Persistance/Database';
import { ModuleModel } from '../../src/Authorization/Permission/Infrastructure/Persistance/Model/ModuleModel';
import { UrlModel } from '../../src/Authorization/Permission/Infrastructure/Persistance/Model/UrlModule';
import { Url } from '../../src/Shared/Domain/Vo/Url.vo';

require('dotenv').config();

const crypto = new CryptoService();
const id = ID.generate();
const adminRoleId = ID.generate();
const yearlyPricingId = ID.generate();

const createBasicRoles = async (database: DataSource) => {
  const roleRepository = database.getRepository(RoleModel);

  await roleRepository.save([
    {
      id: ID.generate(),
      type: new RoleType(CLIENT_ROLE),
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
    {
      id: ID.generate(),
      type: new RoleType(TENANT_ROLE),
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
    {
      id: adminRoleId,
      type: new RoleType(ADMIN_ROLE),
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
  ]);
};

const createAdminUser = async (database: DataSource) => {
  const userRepository = database.getRepository(TenantModel);
  const password = await crypto.hash(process.env.ADMIN_PASSWORD!);
  const configId = ID.generate();

  await userRepository.save({
    id: id,
    name: new Name('Adria Claret'),
    email: new Email(process.env.ADMIN_EMAIL!),
    password: new Password(password),
    tenantId: id,
    roleId: adminRoleId,
    configId: configId,
    isActive: true,
    config: {
      id: configId,
      userId: id,
      sendNotifications: true,
      sendWarnings: true,
      lang: 'ES',
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
    createdAt: DateVo.now().value,
    updatedAt: DateVo.now().value,
  });
};

const createBasicPricing = async (database: DataSource) => {
  const pricingRepository = database.getRepository(PricingModel);

  await pricingRepository.save([
    {
      id: yearlyPricingId,
      name: YEARLY_PRICING,
      tenantId: id,
      price: 1000,
      duration: 365,
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
    {
      id: ID.generate(),
      name: MONTHLY_PRICING,
      tenantId: id,
      price: 50,
      duration: 30,
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
    {
      id: ID.generate(),
      name: QUARTERLY_PRICING,
      tenantId: id,
      price: 150,
      duration: 90,
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
  ]);
};

const createAdminSubscription = async (database: DataSource) => {
  const subscriptionRepository = database.getRepository(SubscriptionModel);
  const validTo = Time.add(new Date(), 100000);

  await subscriptionRepository.save({
    id: ID.generate(),
    isActive: true,
    isExpired: false,
    paymentDate: DateVo.now(),
    validTo: new DateVo(validTo),
    price: 1000,
    duration: 10,
    pricingName: YEARLY_PRICING,
    pricingId: yearlyPricingId,
    userId: id,
    createdAt: DateVo.now().value,
    updatedAt: DateVo.now().value,
  });
};

const createModule = async (database: DataSource) => {
  const moduleRepository = database.getRepository(ModuleModel);

  await moduleRepository.save({
    id: ID.generate(),
    name: new Name('invoices'),
    createdAt: DateVo.now().value,
    updatedAt: DateVo.now().value,
  });
};

const createUrl = async (database: DataSource) => {
  const urlRepository = database.getRepository(UrlModel);

  await urlRepository.save({
    id: ID.generate(),
    url: new Url('/create/invoice'),
    createdAt: DateVo.now().value,
    updatedAt: DateVo.now().value,
  });
};

async function seed() {
  const database = await Database.instance().initialize();

  // await createBasicRoles(database);

  // await createAdminUser(database);

  // await createBasicPricing(database);

  // await createAdminSubscription(database);

  await createModule(database);

  await createUrl(database);
}

seed()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    console.error('FINISH SEEDING DB');
  });
