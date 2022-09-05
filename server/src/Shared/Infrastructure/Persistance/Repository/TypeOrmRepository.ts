import { ClassConstructor } from 'class-transformer';
import { DataSource, ObjectLiteral, Repository } from 'typeorm';

export abstract class TypeOrmRepository<T extends ObjectLiteral> {
  protected abstract dataSource: DataSource;

  protected abstract entitySchema(): ClassConstructor<T>;

  protected repository(): Repository<T> {
    return this.dataSource.getRepository(this.entitySchema());
  }
}
