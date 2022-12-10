import { Module } from '@nestjs/common';
import { AuthorizationBoundedContext } from 'Authorization/Shared/Infrastructure/Nest/AuthorizationBoundedContext';
import { BackofficeBoundedContext } from 'Backoffice/Shared/Infrastructure/Nest/BackofficeBoundedContext';
import { CheckoutBoundedContext } from "Checkout/Shared/Infrastructure/Nest/CheckoutBoundedContext";
import { CronBoundedContext } from 'Cron/Shared/Infrastructure/Nest/CronBoundedContext';
import { InvoiceBoundedContext } from 'Invoicing/Shared/Infrastructure/Nest/InvoiceBoundedContext';

@Module({
  imports: [
    AuthorizationBoundedContext,
    BackofficeBoundedContext,
    InvoiceBoundedContext,
    CronBoundedContext,
    CheckoutBoundedContext,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export default class App {}
