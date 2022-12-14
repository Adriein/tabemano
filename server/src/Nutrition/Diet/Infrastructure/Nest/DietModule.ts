import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';
import { UserMiddleware } from 'Shared/Infrastructure/Middlewares/UserMiddleware';

// const Handlers = [ ];
// const Controllers = [ ];
// const Repository = [
//   {
//     provide: 'InvoiceRepository',
//     useClass: PgInvoiceRepository,
//   },
// ];

@Module({
  imports: [CqrsModule, TypeOrmModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DietModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer.apply(UserMiddleware).forRoutes(...Controllers);
  //   }
}
