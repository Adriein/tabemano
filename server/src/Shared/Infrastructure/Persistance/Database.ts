import { ModuleModel } from 'Shared/Infrastructure/Persistance/Model/ModuleModel';
import { UrlModel } from 'Authorization/Permission/Infrastructure/Persistance/Model/UrlModule';
import { PermissionModel } from 'Authorization/Permission/Infrastructure/Persistance/Model/PermissionModel';
import { PricingModel } from 'Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel';
import { CompanyModel } from 'Shared/Infrastructure/Persistance/Model/CompanyModel';
import { RoleModel } from 'Shared/Infrastructure/Persistance/Model/RoleModel';
import { ConfigModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel';
import { SubscriptionEventModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionEventModel';
import { SubscriptionModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel';
import { BackGroundJobModel } from 'Cron/Shared/Infrastructure/Persistance/Model/BackGroundJobModel';
import { TenantModel } from 'Shared/Infrastructure/Persistance/Model/TenantModel';
import { UserModel } from 'Shared/Infrastructure/Persistance/Model/UserModel';
import { DataSource } from 'typeorm';

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
        ModuleModel,
        PermissionModel,
        UrlModel,
        CompanyModel,
        TenantModel,
      ],
      synchronize: false,
      logging: true,
    });

    return Database._instance;
  }

  private constructor() {}
}
