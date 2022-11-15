import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';

export class ModuleUrlFinderResponse {
  public static fromDomain(permission: Permission): ModuleUrlFinderResponse {
    const moduleUrlList = permission.moduleUrl().map(url => {
      return url.value;
    });

    return new ModuleUrlFinderResponse(moduleUrlList);
  }

  constructor(readonly moduleUrl: string[]) {}
}
