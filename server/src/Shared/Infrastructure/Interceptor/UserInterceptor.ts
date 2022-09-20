import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetTenantProfileQuery } from 'Authorization/Auth/Application/GetTenantProfile/GetTenantProfileQuery';
import { GetUrlListQuery } from 'Authorization/Permission/Application/GetUrlList/GetUrlListQuery';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { UserSession } from 'Shared/Infrastructure/Types';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService, private readonly queryBus: QueryBus) {}

  public async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    console.log('USER INTERCEPTOR');
    const request = context.switchToHttp().getRequest();

    if (!request.session || !request.session.user) {
      return next.handle();
    }

    try {
      console.log(`USER INTERCEPTOR -- BEFORE VERIFYING COOKIE`);
      const user = jwt.verify(
        request.session.user,
        this.config.get<string>('JWT_KEY')!
      ) as UserSession;

      const permissionList = request.session.user.permissions;

      const [id, urlList] = await Promise.all([
        this.findUserId(user.email),
        this.findUrlList(permissionList),
      ]);

      console.log(`ID -- ${id} //// urlList -- ${urlList}`);

      request.user = { ...user, id, urlList };
    } catch (err) {
      throw err;
    }

    return next.handle();
  }

  private async findUserId(email: string): Promise<string> {
    const getTenantProfileQuery = new GetTenantProfileQuery(email);

    return await this.queryBus.execute(getTenantProfileQuery);
  }

  private async findUrlList(permissionsList: { name: string }[]): Promise<string[]> {
    const moduleNameList: {
      name: string;
    }[] = permissionsList.map((permission: any) => {
      return permission.name;
    });

    return Promise.all(
      moduleNameList.map(async (moduleName: { name: string }) => {
        const getUrlListQuery = new GetUrlListQuery(moduleName.name);

        const urlList = await this.queryBus.execute(getUrlListQuery);

        return urlList;
      })
    );
  }
}
