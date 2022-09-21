import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PermissionGuard implements CanActivate {

  public canActivate(context: ExecutionContext): boolean {
    console.log('PERMISSION GUARD');
    const request = context.switchToHttp().getRequest();

    console.log('REQUEST -------------------------------', request.user.urlList.flat());

    const currentUrl = request.url;

    console.log(`CURRENT URL -- ${currentUrl}`);

    if (request.user.urlList) {
      const found = request.user.urlList.find((url: string) => {
        console.log('URL', url);
        currentUrl === url;
      });

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
