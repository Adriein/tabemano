import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateModuleCommandHandler } from 'Backoffice/Module/Application/CreateModule/CreateModuleCommandHandler';
import { UserMiddleware } from 'Shared/Infrastructure/Middlewares/UserMiddleware';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';
import { CreateModuleController } from '../Controller/CreateModuleController';
import { PgModuleMapper } from '../Persistance/Mapper/PgModuleMapper';
import { PgModuleRepository } from '../Persistance/Repository/PgModuleRepository';

const Handlers = [CreateModuleCommandHandler];

const Repository = [
  {
    provide: 'IModuleRepository',
    useClass: PgModuleRepository,
  },
];

const Controllers = [CreateModuleController];

const Mappers = [PgModuleMapper];

@Module({
  imports: [CqrsModule, TypeOrmModule],
  controllers: [...Controllers],
  providers: [...Handlers, ...Repository, ...Mappers],
  exports: [],
})
export class ModuleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(...Controllers);
  }
}
