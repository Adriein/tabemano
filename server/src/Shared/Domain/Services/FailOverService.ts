import { Inject, Injectable } from "@nestjs/common";

import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { FailOverDomainEvent } from "Shared/Domain/Entities/FailOverDomainEvent";
import { IFailOverRepository } from "Shared/Domain/Interfaces/IFailOverRepository";

@Injectable()
export class FailOverService {
  constructor(
    @Inject('IFailOverRepository')
    private readonly repository: IFailOverRepository,
  ) {}

  public async execute(event: DomainEvent, error: Error): Promise<void> {
    const failOverEvent = FailOverDomainEvent.build(event, error);

    await this.repository.save(failOverEvent);
  }
}