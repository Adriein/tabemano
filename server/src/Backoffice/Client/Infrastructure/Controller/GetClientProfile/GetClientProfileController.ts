import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetClientProfileQuery } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQuery";
import { GetClientProfileResponse } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileResponse";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
import { NextFunction, Request, Response } from "express";
import { currentUser, requireAuth } from "Shared/Infrastructure/Middlewares/auth";

@Controller()
export class GetClientProfileController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/client/:id/profile')
  public async getClientProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = GetClientProfileQuery.fromRequest(req);

      const profile = await this.queryBus.execute(query);

      const response = TabemanoResponse.build([ profile ]);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }
}