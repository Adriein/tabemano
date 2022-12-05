import { Inject } from '@nestjs/common';
import { Email } from 'Backoffice/Shared/Domain/Email/Email';
import { ISmtpService } from 'Backoffice/Notification/Domain/Service/ISmtpService';
import { RemainingCreditRunOutDomainEvent } from 'Cron/Credit/Application/CheckIfRemainingCreditIsCloseToRunningOut/RemainingCreditRunOutDomainEvent';
import { Heading } from 'Backoffice/Shared/Domain/Email/Heading';
import { Content } from 'Backoffice/Shared/Domain/Email/Content';
import { FailOverService } from "Shared/Domain/Services/FailOverService";
import { Email as EmailVo } from 'Shared/Domain/Vo/Email.vo';
import { EventsHandler } from '@nestjs/cqrs';
import { IDomainEventHandler } from 'Shared/Domain/Interfaces/IDomainEventHandler';

@EventsHandler(RemainingCreditRunOutDomainEvent)
export class SendRemainingCreditIsCloseToRunningOutEmailHandler implements IDomainEventHandler {
  constructor(
    @Inject('ISmtpService')
    private readonly smtpService: ISmtpService,
    private readonly failOverService: FailOverService
  ) {}

  public async handle(event: RemainingCreditRunOutDomainEvent): Promise<void> {
    try {
      const from = new EmailVo('adria.claret@gmail.com');
      const to = new EmailVo('lbernalrodrguez@gmail.com');
      const subject = `${event.thirdPartyServiceName.value} credits are running out`;

      const heading = new Heading(from, to, subject);

      const content = new Content(
        `<h1>Hey!</h1>
      <p>You have ${event.creditsLeftBeforeNotifying} credits left from ${event.thirdPartyServiceName.value}!</p>`
      );

      const email = new Email(heading, content);

      await this.smtpService.send(email);
    } catch (error) {
      await this.failOverService.execute(event, error as Error);
    }
  }
}
