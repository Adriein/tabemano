import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import client from '@sendgrid/client';
import { SendGridRequest } from './SendGridRequest';
import { ClientResponse, ResponseError } from '@sendgrid/mail';
import { SendGridResponse } from './SendGridResponse';
import { SendGridMetadata } from './SendGridMetadata';

@Injectable()
export class SendGridClient {
  constructor(private readonly config: ConfigService) {
    client.setApiKey(this.config.get<string>('SEND_GRID_API_KEY')!);
  }

  private promisifiedRequest(request: SendGridRequest): Promise<[ ClientResponse, any ]> {
    return new Promise<[ ClientResponse, any ]>((resolve, reject) => {
      client.request(request, (error: ResponseError, response: [ ClientResponse, any ]) => {
        if (error) {
          return reject(error);
        }

        return resolve(response);
      });
    });
  }

  public async makeRequest<Req extends SendGridRequest, Res = void>(
    request: Req
  ): Promise<SendGridResponse<Res>> {
    try {
      if (request.method === 'POST') {
        await this.promisifiedRequest(request);

        const meta = new SendGridMetadata(true);

        return new SendGridResponse<Res>(meta);
      }

      const response = await this.promisifiedRequest(request);

      const meta = new SendGridMetadata(true);

      return new SendGridResponse<Res>(meta, response[1] as Res);
    } catch (error: any) {
      console.log(error.response.body.errors);
      console.log(error);
      const meta = new SendGridMetadata(true, error as Error);

      return new SendGridResponse<Res>(meta);
    }
  }
}
