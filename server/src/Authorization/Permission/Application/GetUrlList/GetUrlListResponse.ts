import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';

export class GetUrlListResponse {
  public static fromDomain(permission: Permission): GetUrlListResponse {
    const urlList = permission.moduleUrl().map(url => {
      return url.value;
    });

    return new GetUrlListResponse(urlList);
  }

  constructor(readonly moduleUrl: string[]) {}
}
