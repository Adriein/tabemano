import { Controller, Get } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CheckExpiredSubscriptionsCommand } from "Backoffice/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommand";
import { NextFunction, Request, Response } from "express";

@Controller()
export class CheckExpiredSubscriptionsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('/subscription/expired')
  public async checkExpiredSubscriptions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const command = new CheckExpiredSubscriptionsCommand();

      await this.commandBus.execute(command);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}