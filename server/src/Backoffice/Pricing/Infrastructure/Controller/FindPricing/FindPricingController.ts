import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { FindPricingQuery } from "Backoffice/Pricing/Application/FindPricing/FindPricingQuery";
import { FindPricingResponse } from "Backoffice/Pricing/Application/FindPricing/FindPricingResponse";
import { TabemanoResponse } from "Shared/Domain/Entities/TabemanoResponse";
import { NextFunction, Request, Response } from "express";
import { currentUser, requireAuth } from "Shared/Infrastructure/Middlewares/auth";

@Controller()
export class FindPricingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/pricing')
  public async findPricing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindPricingQuery.fromRequest(req);

      const pricingList = await this.queryBus.execute(query);

      const response = TabemanoResponse.build(pricingList);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }
}