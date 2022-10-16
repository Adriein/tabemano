import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PermissionGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const currentUrl = request.url;

    const regex = new RegExp('/api/v[0-9]');

    const editedUrl = currentUrl.replace(regex, '');

    if (request.user.urlList) {
      return request.user.urlList.find((url: string) => {
        return editedUrl === url;
      });
    }

    return false;
  }
}
