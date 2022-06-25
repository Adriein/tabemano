import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const ConfigModel = new EntitySchema<Config>({
  name: 'Config',
  tableName: 'ta_config',
  target: Config,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      name: 'co_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    lang: {
      type: 'varchar',
      name: 'co_language',
    },
    sendNotifications: {
      type: 'varchar',
      name: 'co_send_notifications',
    },
    sendWarnings: {
      type: 'varchar',
      name: 'co_send_warnings',
    }
  }
});

