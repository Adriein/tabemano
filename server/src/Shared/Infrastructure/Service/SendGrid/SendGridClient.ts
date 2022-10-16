import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import client from '@sendgrid/client';
import { SendGridRequest } from './SendGridRequest';
import { promisify } from 'util';
import { ClientRequest } from '@sendgrid/client/src/request';
import { ClientResponse } from '@sendgrid/mail';

@Injectable()
export class SendGridClient {
  private readonly _promisifiedRequest: (request: ClientRequest) => Promise<[ ClientResponse, any ]>;

  constructor(private readonly config: ConfigService) {
    client.setApiKey(this.config.get<string>('SEND_GRID_API_KEY')!);
    this._promisifiedRequest = promisify(client.request);
  }

  public async makeRequest<Req extends SendGridRequest, Res = void>(request: Req): Promise<any> {
    if (request.method === 'POST') {
      return await this._promisifiedRequest(request);
    }

    await this._promisifiedRequest(request);
  }
}