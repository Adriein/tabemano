import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PermissionGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    const path = request.url;

    if (request.session.user.permissions) {
    }

    return true;
  }
}
