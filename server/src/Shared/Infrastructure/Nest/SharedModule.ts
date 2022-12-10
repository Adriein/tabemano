import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { LoggerModule } from "Shared/Infrastructure/Logger/LoggerModule";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";


@Module({
  imports: [
    LoggerModule,
    TypeOrmModule,
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [ CryptoService ],
  exports: [ LoggerModule, TypeOrmModule, CqrsModule, CryptoService ],
})
export class SharedModule {}
