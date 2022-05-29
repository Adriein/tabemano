import { Controller, Post } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { FindAppFiltersQuery } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersQuery";
import { FindFiltersResponse } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersResponse";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
import { NextFunction, Request, Response } from "express";

@Controller()
export class FindAppFiltersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/filter')
  public async getAppFilters(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = FindAppFiltersQuery.fromRequest(req);
      const results = await this.queryBus.execute<FindAppFiltersQuery, FindFiltersResponse[]>(query);

      const response = TabemanoResponse.build(results);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }
}