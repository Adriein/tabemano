import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInQueryHandler } from "Authorization/Application/SignIn/SignInQueryHandler";
import { PgAuthRepository } from "Authorization/Infrastructure/Data/Repositories/PgAuthRepository";
import { FindRoleQuery } from "Backoffice/Role/Application/FindRoleQuery";
import { FindRoleQueryHandler } from "Backoffice/Role/Application/FindRoleQueryHandler";
import { PgRoleRepository } from "Backoffice/Role/Infrastructure/Data/Repositories/PgRoleRepository";
import { ConstructorFunc } from '../../Domain/types';
import { CryptoService } from "../../Domain/Services/CryptoService";
import { IQueryHandler } from "../../Domain/Interfaces/IQueryHandler";


export default class QueryHandlerFactory {
  private handlers: Map<string, IQueryHandler<any>> = new Map();

  private authRepository = new PgAuthRepository();
  private roleRepository = new PgRoleRepository();
  private cryptoService: CryptoService = new CryptoService();


  constructor() {
    this.register();
  }

  public create<T, R>(_handler: ConstructorFunc<T>): IQueryHandler<R> {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error('No handler with this name');
    }

    return handler;
  }

  private register() {
    //Authentication
    this.handlers.set(SignInQuery.name, new SignInQueryHandler(this.authRepository));

    //Backoffice
    this.handlers.set(FindRoleQuery.name, new FindRoleQueryHandler(this.roleRepository))
  }

  public getContainer(): Map<string, IQueryHandler<any>> {
    return this.handlers;
  }
}
