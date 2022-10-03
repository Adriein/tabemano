import { Module } from 'Authorization/Permission/Domain/Entity/Module';
import { IRepository } from 'Shared/Domain/Interfaces/IRepository';

export interface IModuleRepository extends IRepository<Module> {}
