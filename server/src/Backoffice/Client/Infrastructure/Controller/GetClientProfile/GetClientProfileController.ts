import { GetClientProfileQuery } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQuery";
import { GetClientProfileResponse } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileResponse";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { get } from "Shared/Infrastructure/Decorators/routes";
import { use } from "Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "Shared/Infrastructure/Middlewares/auth";

@Controller()
export class GetClientProfileController extends BaseController {
  @get('/client/:id/profile')
  @use(requireAuth)
  @use(currentUser)
  public async getClientProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = GetClientProfileQuery.fromRequest(req);

      const profile = await this.queryBus.ask<GetClientProfileResponse>(query);

      const response = TabemanoResponse.build([ profile ]);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }
}