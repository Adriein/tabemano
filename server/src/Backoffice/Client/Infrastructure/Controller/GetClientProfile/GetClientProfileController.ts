import { Controller, Get, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetClientProfileQuery } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQuery";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
import { NextFunction, Request, Response } from "express";
import { AuthGuard } from "Shared/Infrastructure/Guard/AuthGuard";

@Controller()
export class GetClientProfileController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(AuthGuard)
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