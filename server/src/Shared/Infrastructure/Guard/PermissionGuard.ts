import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PermissionGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const currentUrl = request.url;

    if (request.session.user.urlList) {
      const found = request.session.user.urlList.find((url: string) => currentUrl === url);

      if (!found) {
        return false;
      }

      return true;
    }

    return false;
  }
}
