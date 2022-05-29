import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { QueryBus } from "@nestjs/cqrs";
import jwt from "jsonwebtoken";
import { Observable } from "rxjs";
import { UserSession } from "Shared/Infrastructure/Types";

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly queryBus: QueryBus, private readonly config: ConfigService) {}

  public async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (!request.session || !request.session.user) {
      return next.handle();
    }

    try {
      request.user = jwt.verify(
        request.session.user,
        this.config.get<string>('JWT_KEY')!
      ) as UserSession;
    } catch (err) {
      throw err;
    }

    return next.handle();
  }
}