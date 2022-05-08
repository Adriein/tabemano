import { PrismaClient } from '@prisma/client'
import { CryptoService } from "../src/Shared/Domain/Services/CryptoService";
import { ID } from "../src/Shared/Domain/Vo/Id.vo";
import { Time } from "../src/Shared/Infrastructure/Helper/Time";


const prisma = new PrismaClient()
const crypto = new CryptoService();

async function main() {
  const id = ID.generate().value;
  const password = await crypto.hash(process.env.ADMIN_PASSWORD!);

  const pricing = await prisma.ta_pricing.findMany({
    where: {
      OR: [
        {
          pr_name: 'yearly'
        },
        {
          pr_name: 'quarterly'
        },
        {
          pr_name: 'monthly'
        },
      ],
    },
  });

  if (pricing.length > 0) {
    throw new Error('No seeding needed');
  }

  const clientRole = await prisma.ta_role.create({
    data: {
      ro_id: ID.generate().value,
      ro_type: 'client',
      ro_created_at: new Date(),
      ro_updated_at: new Date(),
    }
  });

  const tenantRole = await prisma.ta_role.create({
    data: {
      ro_id: ID.generate().value,
      ro_type: 'tenant',
      ro_created_at: new Date(),
      ro_updated_at: new Date(),
    }
  });

  const adminRole = await prisma.ta_role.create({
    data: {
      ro_id: ID.generate().value,
      ro_type: 'admin',
      ro_created_at: new Date(),
      ro_updated_at: new Date(),
    }
  });

  const user = await prisma.ta_user.create({
    data: {
      us_id: id,
      us_name: 'Adria Claret',
      us_email: process.env.ADMIN_EMAIL!,
      us_password: password,
      us_tenant_id: id,
      us_is_active: true,
      us_created_at: new Date(),
      us_updated_at: new Date(),
      us_role: {
        connect: {
          ro_id: adminRole.ro_id,
        }
      },
      us_config: {
        create: {
          co_id: ID.generate().value,
          co_send_warnings: true,
          co_send_notifications: true,
          co_language: 'ES',
          co_created_at: new Date(),
          co_updated_at: new Date()
        }
      }
    }
  });

  const yearly = await prisma.ta_pricing.create({
    data: {
      pr_id: ID.generate().value,
      pr_name: 'yearly',
      pr_price: 1000,
      pr_duration: 365,
      pr_tenant: {
        connect: {
          us_id: id
        }
      },
      pr_created_at: new Date(),
      pr_updated_at: new Date(),
    }
  });

  const monthly = await prisma.ta_pricing.create({
    data: {
      pr_id: ID.generate().value,
      pr_name: 'monthly',
      pr_price: 50,
      pr_duration: 30,
      pr_tenant: {
        connect: {
          us_id: id
        }
      },
      pr_created_at: new Date(),
      pr_updated_at: new Date(),
    }
  });

  const quarterly = await prisma.ta_pricing.create({
    data: {
      pr_id: ID.generate().value,
      pr_name: 'quarterly',
      pr_price: 150,
      pr_duration: 90,
      pr_tenant: {
        connect: {
          us_id: id
        }
      },
      pr_created_at: new Date(),
      pr_updated_at: new Date(),
    }
  });

  const validTo = Time.add(new Date(), 365);

  const subscription = await prisma.ta_subscription.create({
    data: {
      su_id: ID.generate().value,
      su_is_active: true,
      su_is_expired: false,
      su_payment_date: new Date(),
      su_valid_to: validTo,
      su_price: 1000,
      su_duration: 365,
      su_price_name: 'yearly',
      su_user: {
        connect: {
          us_id: id
        }
      },
      su_pricing: {
        connect: {
          pr_id: yearly.pr_id
        }
      },
      su_created_at: new Date(),
      su_updated_at: new Date()
    }
  });

  const ENTITIES: Record<string, { field: string, type: string }[]> = {
    user: [
      { field: 'active', type: 'boolean' }
    ],
    subscription: [
      { field: 'payment_date', type: 'date' },
      { field: 'valid_to', type: 'date' },
      { field: 'active', type: 'boolean' },
      { field: 'expired', type: 'boolean' },
    ],
    config: [
      { field: 'language', type: 'string' },
      { field: 'send_notifications', type: 'boolean' },
      { field: 'send_warnings', type: 'boolean' },
    ],
    pricing: [
      { field: 'pricing_name', type: 'string' },
      { field: 'duration', type: 'number' },
      { field: 'amount', type: 'number' },
    ],

  }

  for (const entity in ENTITIES) {
    for (const detail of ENTITIES[entity]) {
      await prisma.ta_app_filter.create(
        {
          data: {
            af_id: ID.generate().value,
            af_entity: entity,
            af_field: detail.field,
            af_tenant_id: id,
            af_created_at: new Date(),
            af_updated_at: new Date()
          }
        }
      );
    }

  }

  console.log({ yearly, monthly, quarterly, adminRole, clientRole, tenantRole, user, subscription })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })