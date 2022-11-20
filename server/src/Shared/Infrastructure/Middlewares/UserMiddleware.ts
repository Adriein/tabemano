import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetTenantProfileQuery } from 'Authorization/Auth/Application/GetTenantProfile/GetTenantProfileQuery';
import { GetTenantProfileResponse } from 'Authorization/Auth/Application/GetTenantProfile/GetTenantProfileResponse';
import { ModuleUrlFinderQuery } from 'Authorization/Permission/Application/ModuleUrlFinder/ModuleUrlFinderQuery';
import { ModuleUrlFinderResponse } from 'Authorization/Permission/Application/ModuleUrlFinder/ModuleUrlFinderResponse';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserSession } from '../Types';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService, private readonly queryBus: QueryBus) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    if (!req.session || !req.session.user) {
      return next();
    }

    try {
      const user = jwt.verify(req.session.user, this.config.get<string>('JWT_KEY')!) as UserSession;

      const permissionList = user.permissions;

      const [id, moduleUrlList] = await Promise.all([
        this.findTenantId(user.email),
        this.findModuleUrlList(permissionList),
      ]);

      req.user = { ...user, id, moduleUrlList: moduleUrlList };
    } catch (err) {
      throw err;
    }

    return next();
  }

  private async findTenantId(email: string): Promise<string> {
    const getTenantProfileQuery = new GetTenantProfileQuery(email);

    const response = await this.queryBus.execute<GetTenantProfileQuery, GetTenantProfileResponse>(
      getTenantProfileQuery
    );

    return response.id;
  }

  private async findModuleUrlList(permissionsList: { name: string }[]): Promise<string[]> {
    const moduleNameList: string[] = permissionsList.map((permission: { name: string }) => {
      return permission.name;
    });

    const moduleUrlList = await Promise.all(
      moduleNameList.map(async (moduleName: string) => {
        const moduleUrlFinderQuery = new ModuleUrlFinderQuery(moduleName);

        const urlList = await this.queryBus.execute<ModuleUrlFinderQuery, ModuleUrlFinderResponse>(
          moduleUrlFinderQuery
        );

        return urlList.moduleUrl;
      })
    );

    return moduleUrlList.flat();
  }
}
