import { Filter } from 'Shared/Domain/Entities/Filter';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class ModuleFilter extends Filter {
  public static MODULE_ID_FILTER = 'moduleId';
  public static MODULE_NAME_FILTER = 'name';

  public static create(): ModuleFilter {
    return new ModuleFilter();
  }

  protected data: Map<string, any> = new Map();

  public withModuleId(id: ID): this {
    this.data.set(ModuleFilter.MODULE_ID_FILTER, id);
    return this;
  }

  public withModuleName(name: Name): this {
    this.data.set(ModuleFilter.MODULE_NAME_FILTER, name);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
