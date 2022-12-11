import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CreateProductCommandHandler } from 'Backoffice/Product/Application/CreateProduct/CreateProductCommandHandler';
import { UserMiddleware } from 'Shared/Infrastructure/Middlewares/UserMiddleware';
import { SharedModule } from "Shared/Infrastructure/Nest/SharedModule";
import { CreateProductController } from '../Controller/CreateProductController';
import { PgProductMapper } from '../Persistance/Mapper/PgProductMapper';
import { PgProductRepository } from '../Persistance/Repository/PgProductRepository';

const Handlers = [ CreateProductCommandHandler ];

const Repository = [
  {
    provide: 'IProductRepository',
    useClass: PgProductRepository,
  },
];

const Controllers = [ CreateProductController ];

const Mappers = [ PgProductMapper ];

@Module({
  imports: [ SharedModule ],
  controllers: [ ...Controllers ],
  providers: [ ...Handlers, ...Repository, ...Mappers ],
  exports: [],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(...Controllers);
  }
}
