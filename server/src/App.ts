import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthorizationBoundedContext } from "Authorization/AuthorizationBoundedContext";
import { BackofficeBoundedContext } from "Backoffice/BackofficeBoundedContext";
import { CryptoService } from "Shared/Domain/Services/CryptoService";

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthorizationBoundedContext,
    BackofficeBoundedContext
  ],
  controllers: [],
  providers: [
    CryptoService
  ],
  exports: [ CqrsModule, CryptoService ],
})
export default class App {}

