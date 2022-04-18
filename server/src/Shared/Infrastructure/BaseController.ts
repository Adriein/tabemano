import { CommandBus } from './Bus/CommandBus';
import { QueryBus } from './Bus/QueryBus';

export abstract class BaseController {
  protected get commandBus() {
    return CommandBus.instance();
  }

  protected get queryBus() {
    return QueryBus.instance();
  }
}
