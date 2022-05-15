import { FindPricingQuery } from "Backoffice/Pricing/Application/FindPricing/FindPricingQuery";
import { FindPricingResponse } from "Backoffice/Pricing/Application/FindPricing/FindPricingResponse";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { get } from "Shared/Infrastructure/Decorators/routes";
import { use } from "Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "Shared/Infrastructure/Middlewares/auth";

@Controller()
export class FindPricingController extends BaseController {
  @get('/pricing')
  @use(requireAuth)
  @use(currentUser)
  public async findPricing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindPricingQuery.fromRequest(req);

      const pricingList = await this.queryBus.ask<FindPricingResponse[]>(query);

      const response = TabemanoResponse.build(pricingList);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }
}