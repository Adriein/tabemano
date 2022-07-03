import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const PricingModel = new EntitySchema<Pricing>({
  name: 'Pricing',
  tableName: 'ta_pricing',
  target: Pricing,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      name: 'pr_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    name: {
      type: 'varchar',
      name: 'pr_name',
    },
    duration: {
      type: 'smallint',
      name: 'pr_duration',
    },
    price: {
      type: 'double precision',
      name: 'pr_price',
    },
    createdAt: {
      type: 'timestamp',
      name: 'pr_created_at',
      precision: 0,
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      name: 'pr_updated_at',
      precision: 0,
      updateDate: true,
    }
  }
});

