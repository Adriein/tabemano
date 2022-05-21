const config = {
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(config, {
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      logging: false,
    })
    break;
  case 'pro':
    Object.assign(config, {
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      logging: false,
    })
    break;
  default:
    throw new Error('No env set');
}