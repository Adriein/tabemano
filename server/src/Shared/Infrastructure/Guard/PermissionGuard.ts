import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PermissionGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('PERMISSION GUARD');

    const currentUrl = request.url;

    console.log(`CURRENT URL -- ${currentUrl}`);

    if (request.session.user.urlList) {
      const found = request.session.user.urlList.find((url: string) => currentUrl === url);

      if (!found) {
        console.log(`URL NOT FOUND!!`);

        return false;
      }

      console.log(`URL FOUND -- ${found}`);
      return true;
    }

    console.log('RETURN FALSE');

    return false;
  }
}
