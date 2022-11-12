import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    const match = roles.find((role: string) => role === userRole);

    if (!match) {
      return false;
    }

    return true;
  }
}
