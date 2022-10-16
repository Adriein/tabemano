import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";


@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CompanyModule {}