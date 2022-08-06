import { BackGroundJob } from "../Entity/BackGroundJob";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IBackGroundJobRepository extends IRepository<BackGroundJob> {}