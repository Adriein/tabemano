import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetTenantProfileQuery } from 'Authorization/Auth/Application/GetTenantProfile/GetTenantProfileQuery';
import { GetUrlListQuery } from 'Authorization/Permission/Application/GetUrlList/GetUrlListQuery';
import { GetUrlListResponse } from 'Authorization/Permission/Application/GetUrlList/GetUrlListResponse';
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
    console.log('USER MIDDLEWARE');

    if (!req.session || !req.session.user) {
      return next();
    }

    try {
      const user = jwt.verify(req.session.user, this.config.get<string>('JWT_KEY')!) as UserSession;

      console.log('USER', user);

      const permissionList = user.permissions;
      console.log('PERMISSION LIST', user.permissions);

      const [id, urlList] = await Promise.all([
        this.findUserId(user.email),
        this.findUrlList(permissionList),
      ]);

      req.user = { ...user, id, urlList };

      console.log('REQ USER', req.user);
    } catch (err) {
      throw err;
    }

    return next();
  }

  private async findUserId(email: string): Promise<string> {
    const getTenantProfileQuery = new GetTenantProfileQuery(email);

    return await this.queryBus.execute(getTenantProfileQuery);
  }

  private async findUrlList(permissionsList: { name: string }[]): Promise<string[]> {
    const moduleNameList: string[] = permissionsList.map((permission: any) => {
      return permission.name;
    });

    const moduleUrlList = await Promise.all(
      moduleNameList.map(async (moduleName: string) => {
        const getUrlListQuery = new GetUrlListQuery(moduleName);

        const urlList = await this.queryBus.execute<GetUrlListQuery, GetUrlListResponse>(
          getUrlListQuery
        );

        return urlList.moduleUrl;
      })
    );

    return moduleUrlList.flat();
  }
}
