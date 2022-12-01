import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';
import { ID } from '../../../src/Shared/Domain/Vo/Id.vo';

export class PermissionObjectMother {
  private _permissionId: ID = ID.generate();

  private constructor() {}

  public static create(): PermissionObjectMother {
    return new PermissionObjectMother();
  }

  public withPermissionAssigned() {}

  public withoutPermissionAssigned() {}

  public build(): Permission {
    const permissionId = ID.generate();
    const tenantId = ID.generate();
    const moduleId = ID.generate();

    const moduleUrl = [new Url('/nutrition/create'), new Url('/nutrition')];

    return new Permission(permissionId, tenantId, moduleId, new Name('MockName'), moduleUrl);
  }
}
