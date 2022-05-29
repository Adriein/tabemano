import { Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { RegisterTenantApiRequest } from "Authorization/Infrastructure/Controller/RegisterTenant/RegisterTenantApiRequest";
import { NextFunction, Request, Response } from "express";

@Controller()
export class RegisterTenantController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register')
  public async register(
    req: Request<{}, {}, RegisterTenantApiRequest>,
    res: Response<void>,
    next: NextFunction
  ): Promise<void> {
    try {
      const command = RegisterTenantCommand.fromJson(req.body);

      await this.commandBus.execute(command);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}