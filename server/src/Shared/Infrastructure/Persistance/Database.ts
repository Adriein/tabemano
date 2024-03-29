import { ProductModel } from 'Shared/Infrastructure/Persistance/Model/ProductModel';
import { PricingModel } from 'Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel';
import { CompanyModel } from 'Shared/Infrastructure/Persistance/Model/CompanyModel';
import { RoleModel } from 'Shared/Infrastructure/Persistance/Model/RoleModel';
import { ConfigModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel';
import { SubscriptionEventModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionEventModel';
import { SubscriptionModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel';
import { BackGroundJobModel } from 'Cron/Shared/Infrastructure/Persistance/Model/BackGroundJobModel';
import { TenantCompanyModel } from "Shared/Infrastructure/Persistance/Model/TenantCompanyModel";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";
import { DataSource } from 'typeorm';
import { PermissionModel } from './Model/PermissionModel';
import { UrlProductModel } from './Model/UrlProductModel';
import { ThirdPartyServiceModel } from './Model/ThirdPartyServiceModel';

export default class Database {
  public static readonly DATABASE_CONNECTION = 'DATABASE_CONNECTION';
  private static _instance: DataSource;

  public static instance(): DataSource {
    if (Database._instance) {
      return this._instance;
    }

    Database._instance = new DataSource({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        RoleModel,
        UserModel,
        ConfigModel,
        PricingModel,
        SubscriptionModel,
        SubscriptionEventModel,
        BackGroundJobModel,
        ProductModel,
        PermissionModel,
        UrlProductModel,
        CompanyModel,
        TenantModel,
        ThirdPartyServiceModel,
        TenantCompanyModel
      ],
      synchronize: false,
      logging: false,
    });

    return Database._instance;
  }

  private constructor() {}
}
