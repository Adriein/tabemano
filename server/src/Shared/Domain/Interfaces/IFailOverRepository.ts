import { FailOverDomainEvent } from "Shared/Domain/Entities/FailOverDomainEvent";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IFailOverRepository extends IRepository<FailOverDomainEvent> {

}