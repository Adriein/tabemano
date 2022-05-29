import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthorizationBoundedContext } from "Authorization/AuthorizationBoundedContext";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import Database from "Shared/Infrastructure/Data/Database";

const DatabaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => Database.instance().initialize(),
};

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthorizationBoundedContext
  ],
  controllers: [],
  providers: [
    DatabaseProvider,
    CryptoService
  ],
  exports: [ CqrsModule, DatabaseProvider, CryptoService ],
})
export default class App {}

