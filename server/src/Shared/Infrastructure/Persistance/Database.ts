import { AuthModel } from "Authorization/Infrastructure/Persistance/Model/AuthModel";
import { RoleModel } from "Backoffice/Role/Infrastructure/Persistance/Model/RoleModel";
import { UserModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/UserModel";
import { DataSource } from 'typeorm';

export default class Database {
  public static readonly DATABASE_CONNECTION = 'DATABASE_CONNECTION';
  private static _instance: DataSource;

  public static instance(): DataSource {
    if (Database._instance) {
      return this._instance;
    }

    Database._instance = new DataSource({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [ AuthModel, RoleModel, UserModel ],
      synchronize: false,
      logging: true,
    });

    return Database._instance;
  }

  private constructor() {}
}