import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DietModule } from 'src/Nutrition/Diet/Infrastructure/Nest/DietModule';

@Module({
  imports: [CqrsModule, DietModule],
  controllers: [],
  providers: [],
  exports: [CqrsModule, DietModule],
})
export class NutritionBoundedContext {}
