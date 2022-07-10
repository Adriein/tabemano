import { ICommandHandler } from "@nestjs/cqrs";
import { RegisterCompanyCommand } from "Invoicing/Company/Application/RegisterCompany/RegisterCompanyCommand";
import { ICompanyRepository } from "Invoicing/Company/Domain/Repository/ICompanyRepository";

export class RegisterCompanyCommandHandler implements ICommandHandler {
  constructor(private readonly repository: ICompanyRepository) {}

  public execute(command: RegisterCompanyCommand): Promise<void> {
    throw new Error();
  }
}