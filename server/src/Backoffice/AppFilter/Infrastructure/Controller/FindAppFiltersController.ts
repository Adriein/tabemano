import { FindFiltersResponse } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersResponse";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { get } from "Shared/Infrastructure/Decorators/routes";
import { use } from "Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "Shared/Infrastructure/Middlewares/auth";

@Controller()
export class FindAppFiltersController extends BaseController {
  @get('/filter')
  @use(requireAuth)
  @use(currentUser)
  public async getAppFilters(
    req: Request,
    res: Response<FindFiltersResponse[]>,
    next: NextFunction
  ) {
    try {
      res.status(200).send([]);
    } catch (error) {
      next(error);
    }
  }
}