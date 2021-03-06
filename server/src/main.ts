import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { ErrorsInterceptor } from "Shared/Infrastructure/Interceptor/ErrorInterceptor";
import App from "./App";
import CookieSession from 'cookie-session';


async function bootstrap() {
  const app = await NestFactory.create(App);

  const config = app.get(ConfigService);

  app.use(CookieSession({
    name: 'tabemano-session',
    secret: config.get('JWT_KEY'),
    maxAge: 24 * 60 * 60 * 1000
  }));

  app.useGlobalInterceptors(new ErrorsInterceptor());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api/v1');

  await app.listen(5000);
}

bootstrap();
