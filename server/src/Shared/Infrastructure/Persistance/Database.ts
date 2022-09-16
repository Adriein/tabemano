import { AuthModel } from 'Authorization/Auth/Infrastructure/Persistance/Model/AuthModel';
import { AuthRoleModel } from 'Authorization/Auth/Infrastructure/Persistance/Model/AuthRoleModel';
import { ModuleModel } from 'Authorization/Permission/Infrastructure/Persistance/Model/ModuleModel';
import { ModuleUrlModel } from 'Authorization/Permission/Infrastructure/Persistance/Model/ModuleUrlModel';
import { UrlModel } from 'Authorization/Permission/Infrastructure/Persistance/Model/UrlModule';
import { UserModuleModel } from 'Authorization/Permission/Infrastructure/Persistance/Model/UserModuleModel';
import { ClientModel } from 'Backoffice/Client/Infrastructure/Persistance/Model/ClientModel';
import { PricingModel } from 'Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel';
import { RoleModel } from 'Backoffice/Role/Infrastructure/Persistance/Model/RoleModel';
import { ConfigModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel';
import { SubscriptionEventModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionEventModel';
import { SubscriptionModel } from 'Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel';
import { TenantModel } from 'Backoffice/Tenant/Infrastructure/Persistance/Model/TenantModel';
import { CronClientModel } from 'Cron/Client/Infrastructure/Persistance/Model/CronClientModel';
import { BackGroundJobModel } from 'Cron/Shared/Infrastructure/Persistance/Model/BackGroundJobModel';
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
        TenantModel,
        ConfigModel,
        PricingModel,
        SubscriptionModel,
        SubscriptionEventModel,
        AuthModel,
        AuthRoleModel,
        ClientModel,
        BackGroundJobModel,
        ModuleModel,
        UserModuleModel,
        UrlModel,
        ModuleUrlModel,
      ],
      synchronize: false,
      logging: true,
    });

    return Database._instance;
  }

  private constructor() {}
}
