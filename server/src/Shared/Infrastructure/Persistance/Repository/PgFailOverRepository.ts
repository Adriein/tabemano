import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { FailOverDomainEvent } from "Shared/Domain/Entities/FailOverDomainEvent";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { IFailOverRepository } from "Shared/Domain/Interfaces/IFailOverRepository";
import Database from "Shared/Infrastructure/Persistance/Database";
import { DomainEventFailOverModel } from "Shared/Infrastructure/Persistance/Model/DomainEventFailOverModel";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

@Injectable()
export class PgFailOverRepository extends TypeOrmRepository<DomainEventFailOverModel> implements IFailOverRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
  ) {
    super();
  }

  protected entitySchema(): ClassConstructor<DomainEventFailOverModel> {
    return DomainEventFailOverModel;
  }

  delete(entity: FailOverDomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: Filter): Promise<Result<FailOverDomainEvent[], Error>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Result<FailOverDomainEvent, Error | RecordNotFoundError>> {
    throw new Error();
  }

  save(entity: FailOverDomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: FailOverDomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }

}