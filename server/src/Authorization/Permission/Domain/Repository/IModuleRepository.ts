import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Module } from '../Entity/Module';

export interface IPermissionRepository extends IRepository<Module> {}
