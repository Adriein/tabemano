import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetTenantProfileQuery } from 'Authorization/Auth/Application/GetTenantProfile/GetTenantProfileQuery';
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
    const request = context.switchToHttp().getRequest();

    if (!request.session || !request.session.user) {
      return next.handle();
    }

    try {
      const user = jwt.verify(
        request.session.user,
        this.config.get<string>('JWT_KEY')!
      ) as UserSession;

      const query = GetTenantProfileQuery.fromJson({ email: user.email });

      const id = await this.queryBus.execute(query);

      request.user = { user, id };
    } catch (err) {
      throw err;
    }

    return next.handle();
  }
}
