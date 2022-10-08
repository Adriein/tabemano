import { ID } from '../../../src/Shared/Domain/Vo/Id.vo';

export class PermissionObjectMother {
  private _permissionId: ID = ID.generate();

  private constructor() {}

  public static create(): PermissionObjectMother {
    return new PermissionObjectMother();
  }

  public withPermissionAssigned() {}

  public withoutPermissionAssigned() {}
}
