import { FindAppFiltersQuery } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersQuery";
import { FindFiltersResponse } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersResponse";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { post } from "Shared/Infrastructure/Decorators/routes";
import { use } from "Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "Shared/Infrastructure/Middlewares/auth";

@Controller()
export class FindAppFiltersController extends BaseController {
  @post('/filter')
  @use(requireAuth)
  @use(currentUser)
  public async getAppFilters(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = FindAppFiltersQuery.fromRequest(req);
      const results = await this.queryBus.ask<FindFiltersResponse[]>(query);

      const response = TabemanoResponse.build(results);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }
}