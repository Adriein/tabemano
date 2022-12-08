import { Logger, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from '@nestjs/core';
import { EventBus } from "@nestjs/cqrs";
import { TabemanoEventBus } from "Shared/Domain/Entities/TabemanoEventBus";
import { ErrorsInterceptor } from "Shared/Infrastructure/Interceptor/ErrorInterceptor";
import { TabemanoLogger } from "Shared/Infrastructure/Logger/TabemanoLogger";
import App from "./App";
import CookieSession from 'cookie-session';


async function bootstrap() {
  const app = await NestFactory.create(App);

  const config = app.get(ConfigService);
  const eventBus = app.get(EventBus);
  const logger = app.get('ITabemanoLogger');

  TabemanoEventBus.instance(eventBus);

  app.use(CookieSession({
    name: 'tabemano-session',
    secret: config.get('JWT_KEY'),
    maxAge: 24 * 60 * 60 * 1000,
    signed: false,
    secure: false,
    httpOnly: false,
  }));

  app.useGlobalInterceptors(new ErrorsInterceptor(logger));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api/v1');

  await app.listen(5000);
}

bootstrap();
