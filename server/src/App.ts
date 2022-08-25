import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthorizationBoundedContext } from "Authorization/Shared/Infrastructure/Nest/AuthorizationBoundedContext";
import { BackofficeBoundedContext } from "Backoffice/Shared/Infrastructure/Nest/BackofficeBoundedContext";
import { InvoiceBoundedContext } from "Invoicing/Shared/Infrastructure/Nest/InvoiceBoundedContext";
import { CryptoService } from "Shared/Domain/Services/CryptoService";

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthorizationBoundedContext,
    BackofficeBoundedContext,
    InvoiceBoundedContext
  ],
  controllers: [],
  providers: [
    CryptoService
  ],
  exports: [ CqrsModule, CryptoService ],
})
export default class App {}

