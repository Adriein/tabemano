import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [],
  exports: [CqrsModule],
})
export class NutritionBoundedContext {}
