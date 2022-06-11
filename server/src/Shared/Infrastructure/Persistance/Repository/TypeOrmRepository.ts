import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { Describer } from "Shared/Domain/types";
import { DataSource, EntitySchema, Repository } from "typeorm";


export abstract class TypeOrmRepository<T extends Aggregate> {
  protected abstract dataSource: DataSource;

  protected abstract entitySchema(): EntitySchema<T>;

  protected repository(): Repository<T> {
    return this.dataSource.getRepository(this.entitySchema());
  }
}