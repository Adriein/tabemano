import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInQueryHandler } from "Authorization/Application/SignIn/SignInQueryHandler";
import { PgAuthRepository } from "Authorization/Infrastructure/Data/Repositories/PgAuthRepository";
import { FindAppFiltersQuery } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersQuery";
import { FindAppFiltersQueryHandler } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersQueryHandler";
import { PgAppFilterRepository } from "Backoffice/AppFilter/Infrastructure/Data/Repository/PgAppFilterRepository";
import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { FindTenantClientsQueryHandler } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQueryHandler";
import { GetClientProfileQuery } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQuery";
import { GetClientProfileQueryHandler } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQueryHandler";
import { PgClientRepository } from "Backoffice/Client/Infrastructure/Data/Repository/PgClientRepository";
import { FindRoleQuery } from "Backoffice/Role/Application/FindRoleQuery";
import { FindRoleQueryHandler } from "Backoffice/Role/Application/FindRoleQueryHandler";
import { PgRoleRepository } from "Backoffice/Role/Infrastructure/Data/Repository/PgRoleRepository";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Data/Repositories/PgSubscriptionRepository";
import { UserFilterFactory } from "Backoffice/Tenant/Infrastructure/UserFilterFactory";
import { ConstructorFunc } from '../../Domain/types';
import { CryptoService } from "../../Domain/Services/CryptoService";
import { IQueryHandler } from "../../Domain/Interfaces/IQueryHandler";


export default class QueryHandlerFactory {
  private handlers: Map<string, IQueryHandler<any>> = new Map();

  private clientRepository = new PgClientRepository();
  private subscriptionRepository = new PgSubscriptionRepository();
  private authRepository = new PgAuthRepository();
  private roleRepository = new PgRoleRepository();
  private appFilterRepository = new PgAppFilterRepository();
  private cryptoService: CryptoService = new CryptoService();

  private userFilterFactory = new UserFilterFactory();


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
    this.handlers.set(FindRoleQuery.name, new FindRoleQueryHandler(this.roleRepository));

    this.handlers.set(
      FindTenantClientsQuery.name,
      new FindTenantClientsQueryHandler(this.clientRepository, this.subscriptionRepository, this.userFilterFactory)
    );

    this.handlers.set(
      GetClientProfileQuery.name,
      new GetClientProfileQueryHandler(this.clientRepository, this.subscriptionRepository)
    );

    this.handlers.set(
      FindAppFiltersQuery.name,
      new FindAppFiltersQueryHandler(this.appFilterRepository)
    );
  }

  public getContainer(): Map<string, IQueryHandler<any>> {
    return this.handlers;
  }
}
