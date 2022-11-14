import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import { UserSession } from '../Types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly config: ConfigService) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    const user = jwt.verify(
      request.session.user,
      this.config.get<string>('JWT_KEY')!
    ) as UserSession;

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }
}
