import { DataSource } from 'typeorm';
import { PricingModel } from '../../src/Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel';
import { Address } from "../../src/Shared/Domain/Vo/Address.vo";
import { City } from "../../src/Shared/Domain/Vo/City.vo";
import { CompanyType } from "../../src/Shared/Domain/Vo/CompanyType.vo";
import { Country } from "../../src/Shared/Domain/Vo/Country.vo";
import { FiscalId } from "../../src/Shared/Domain/Vo/FiscalId.vo";
import { Phone } from "../../src/Shared/Domain/Vo/Phone.vo";
import { State } from "../../src/Shared/Domain/Vo/State.vo";
import { CompanyModel } from "../../src/Shared/Infrastructure/Persistance/Model/CompanyModel";
import { RoleModel } from '../../src/Shared/Infrastructure/Persistance/Model/RoleModel';
import {
  MONTHLY_PRICING,
  QUARTERLY_PRICING,
  YEARLY_PRICING,
} from '../../src/Backoffice/Shared/constants';
import { SubscriptionModel } from '../../src/Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel';
import { ADMIN_ROLE, CLIENT_ROLE, TENANT_ROLE } from '../../src/Shared/Domain/constants';
import { CryptoService } from '../../src/Shared/Domain/Services/CryptoService';
import { DateVo } from '../../src/Shared/Domain/Vo/Date.vo';
import { Email } from '../../src/Shared/Domain/Vo/Email.vo';
import { ID } from '../../src/Shared/Domain/Vo/Id.vo';
import { Name } from '../../src/Shared/Domain/Vo/Name.vo';
import { Password } from '../../src/Shared/Domain/Vo/Password.vo';
import { RoleType } from '../../src/Shared/Domain/Vo/RoleType';
import { TenantModel } from "../../src/Shared/Infrastructure/Persistance/Model/TenantModel";
import { Time } from '../../src/Shared/Infrastructure/Helper/Time';
import Database from '../../src/Shared/Infrastructure/Persistance/Database';

require('dotenv').config();

const crypto = new CryptoService();
const id = ID.generate();
const adminRoleId = ID.generate();
const yearlyPricingId = ID.generate();
const companyId = ID.generate();

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

const createCompany = async (database: DataSource) => {
  const companyRepository = database.getRepository(CompanyModel);

  await companyRepository.save({
    id: companyId,
    fiscalId: new FiscalId('1111'),
    name: new Name('Tabemano'),
    address: new Address('1111'),
    type: new CompanyType('SL'),
    country: new Country('Spain'),
    phone: new Phone('11111'),
    city: new City('Barcelona'),
    state: new State('Catalonia'),
    createdAt: DateVo.now().value,
    updatedAt: DateVo.now().value,
  });
}

const createTenant = async (database: DataSource) => {
  const tenantRepository = database.getRepository(TenantModel);
  const password = await crypto.hash(process.env.ADMIN_PASSWORD!);
  const configId = ID.generate();

  await tenantRepository.save({
    id: id,
    name: new Name('Adria Claret'),
    email: new Email(process.env.ADMIN_EMAIL!),
    password: new Password(password),
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
    role: {
      id: adminRoleId,
    },
    company: {
      id: companyId
    },
    companyId: companyId,
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
      tenant: {
        id
      },
      price: 1000,
      duration: 365,
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
    {
      id: ID.generate(),
      name: MONTHLY_PRICING,
      tenantId: id,
      tenant: {
        id
      },
      price: 50,
      duration: 30,
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
    {
      id: ID.generate(),
      name: QUARTERLY_PRICING,
      tenantId: id,
      tenant: {
        id
      },
      price: 150,
      duration: 90,
      createdAt: DateVo.now().value,
      updatedAt: DateVo.now().value,
    },
  ]);
};

const createTenantSubscription = async (database: DataSource) => {
  const subscriptionRepository = database.getRepository(SubscriptionModel);
  const validTo = Time.add(new Date(), 100000);
  const subscriptionId = ID.generate();

  await subscriptionRepository.save({
    id: subscriptionId,
    isActive: true,
    isExpired: false,
    paymentDate: DateVo.now(),
    validTo: new DateVo(validTo),
    price: 1000,
    duration: 10,
    pricingName: YEARLY_PRICING,
    pricingId: yearlyPricingId,
    userId: null,
    tenantId: id,
    tenant: {
      id
    },
    events: [
      {
        id: ID.generate(),
        subscriptionId: subscriptionId,
        event: 'created',
        createdAt: DateVo.now().value,
        updatedAt: DateVo.now().value
      }
    ],
    createdAt: DateVo.now().value,
    updatedAt: DateVo.now().value,
  });
};

async function seed() {
  const database = await Database.instance().initialize();

  await createBasicRoles(database);

  await createCompany(database);

  await createTenant(database);

  await createBasicPricing(database);

  await createTenantSubscription(database);
}

seed()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    console.error('FINISH SEEDING DB');
  });
