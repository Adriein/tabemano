import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationBoundedContext } from 'Authorization/Shared/Infrastructure/Nest/AuthorizationBoundedContext';
import { BackofficeBoundedContext } from 'Backoffice/Shared/Infrastructure/Nest/BackofficeBoundedContext';
import { CronBoundedContext } from 'Cron/Shared/Infrastructure/Nest/CronBoundedContext';
import { InvoiceBoundedContext } from 'Invoicing/Shared/Infrastructure/Nest/InvoiceBoundedContext';
import { CryptoService } from 'Shared/Domain/Services/CryptoService';
import { SharedBoundedContext } from "Shared/Infrastructure/Nest/SharedBoundedContext";

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthorizationBoundedContext,
    BackofficeBoundedContext,
    InvoiceBoundedContext,
    CronBoundedContext,
    SharedBoundedContext
  ],
  controllers: [],
  providers: [ CryptoService ],
  exports: [ CqrsModule, CryptoService ],
})
export default class App {}
