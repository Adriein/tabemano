require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import cookieSession from 'cookie-session';
import chalk from 'chalk';
import * as fs from "fs";
import path from 'path';
import { errorHandler } from 'Shared/Infrastructure/Middlewares';
import Database from 'Shared/Infrastructure/Data/Database';
import AppRouter from 'Shared/Infrastructure/AppRouter';
import ExplorerService from './ExplorerService';
import DomainEventHandlerFactory from 'Shared/Infrastructure/Factories/DomainEventHandler.factory';
import { DomainEventsManager } from 'Shared/Domain/Entities/DomainEventsManager';
import { CommandClass, DomainEventClass, QueryClass } from 'Shared/Domain/types';
import { COMMANDS_HANDLER_METADATA, EVENTS_HANDLER_METADATA, QUERY_HANDLER_METADATA } from 'Shared/Domain/constants';
import { CommandBus } from "Shared/Infrastructure/Bus/CommandBus";
import { QueryBus } from "Shared/Infrastructure/Bus/QueryBus";
import QueryHandlerFactory from "Shared/Infrastructure/Factories/QueryHandler.factory";
import CommandHandlerFactory from "Shared/Infrastructure/Factories/CommandHandler.factory";


export default class App {
  public init() {
    console.log(chalk.cyan('> Starting up... 🚀'));

    console.log(chalk.cyan('> Checking env variables...'));

    process.on('exit', (code) => {
      console.log(chalk.red.bold(`> About to exit with code: ${code} something went wrong`));
    });

    this.checkEnvVariables();

    console.log(chalk.cyan('> Env variables set correctly ✨'));

    this.bindControllers();

    Database.instance();

    this.bindDomainEvents();

    this.bindCommands();

    this.bindQueries();

    this.bootstrapHttpServer();
  }

  private bootstrapHttpServer(): void {
    console.log(chalk.cyan('> Starting http server... 👾'));
    const app = express();

    app.set('port', process.env.PORT || 5000);
    console.log(chalk.cyan(`> App Environment: PORT: ${app.get('port')} CONFIG: ${process.env.NODE_ENV} `));

    app.use(express.json());
    app.use(
      cookieSession({
        signed: false,
        secure: false,
        // maxAge: 900000,
        httpOnly: false,
        name: 'tabemano-session'
      })
    );

    app.use('/api/v1', AppRouter.getInstance());
    app.use(errorHandler);

    if (process.env.NODE_ENV === 'PRO') {
      app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') res.redirect(`https://${req.header('host')}${req.url}`);
        else next();
      });

      app.use(express.static('client-deprecated/build'));

      app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client-deprecated', 'build', 'index.html'));
      });
    }

    app.listen(app.get('port'), () => {
      console.log(chalk.green.bold(`> Server is running... ✅`));
    });
  }

  private checkEnvVariables(): void {
    if (
      !process.env.SEND_GRID_API_KEY ||
      !process.env.NODE_ENV ||
      !process.env.ADMIN_EMAIL ||
      !process.env.JWT_KEY ||
      !process.env.LOG_LEVEL ||
      !process.env.DAYS_BEFORE_EXPIRATION ||
      !process.env.DATABASE_NAME ||
      !process.env.DATABASE_USER ||
      !process.env.DATABASE_PASSWORD ||
      !process.env.DATABASE_PORT ||
      !process.env.DATABASE_HOST
    ) {
      process.exit(1);
    }
  }

  private bindDomainEvents(): void {
    console.log(chalk.blue('> Binding domain events handlers...'));

    const factory = new DomainEventHandlerFactory();
    for (const handler of factory.getContainer().values()) {
      const domainEvents = ExplorerService.explore<Function, DomainEventClass>(
        handler.constructor,
        EVENTS_HANDLER_METADATA
      );

      domainEvents.forEach((event: DomainEventClass) => DomainEventsManager.subscribe(event, handler));
    }
  }

  private bindCommands(): void {
    console.log(chalk.blue('> Binding command handlers...'));

    const factory = new CommandHandlerFactory();
    for (const handler of factory.getContainer().values()) {
      const commands = ExplorerService.explore<Function, CommandClass>(
        handler.constructor,
        COMMANDS_HANDLER_METADATA
      );

      commands.forEach((command: CommandClass) => CommandBus.bind(command, handler));
    }
  }

  private bindQueries(): void {
    console.log(chalk.blue('> Binding query handlers...'));

    const factory = new QueryHandlerFactory();
    for (const handler of factory.getContainer().values()) {
      const queries = ExplorerService.explore<Function, QueryClass>(handler.constructor, QUERY_HANDLER_METADATA);

      queries.forEach((query: QueryClass) => QueryBus.bind(query, handler));
    }
  }

  private bindControllers(): void {
    console.log(chalk.blue('> Binding controllers...'));

    ExplorerService.bindControllers();
  }
}

