import { ClassConstructor } from "class-transformer";
import { DataSource, Repository } from "typeorm";


export abstract class TypeOrmRepository<T> {
  protected abstract dataSource: DataSource;

  protected abstract entitySchema(): ClassConstructor<T>;

  protected repository(): Repository<T> {
    return this.dataSource.getRepository(this.entitySchema());
  }
}