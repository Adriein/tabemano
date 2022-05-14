import { BackgroundJob } from "Backoffice/Shared/Domain/BackgroundJob/BackgroundJob";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IBackgroundJobRepository extends IRepository<BackgroundJob> {};