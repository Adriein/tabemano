import { Module } from "@nestjs/common";
import Database from "Shared/Infrastructure/Persistance/Database";

const DatabaseProvider = {
  provide: Database.DATABASE_CONNECTION,
  useFactory: async () => Database.instance().initialize(),
};

@Module({
  providers: [ DatabaseProvider ],
  exports: [ DatabaseProvider ],
})
export class TypeOrmModule {}