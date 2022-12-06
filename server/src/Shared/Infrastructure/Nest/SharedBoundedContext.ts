import { Module } from '@nestjs/common';
import { LoggerModule } from "Shared/Infrastructure/Logger/LoggerModule";


@Module({
  imports: [ LoggerModule ],
  controllers: [],
  providers: [],
  exports: [ LoggerModule ],
})
export class SharedBoundedContext {}
