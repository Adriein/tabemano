import { ConfigService } from "@nestjs/config";
import client from '@sendgrid/client';

export class SendGridClient {
  constructor(private readonly config: ConfigService) {
    client.setApiKey(this.config.get<string>('SEND_GRID_API_KEY')!);
  }

  public async request<Req extends { url: string }, Res = any>(request: Req): Promise<void> {
    client.request(request)
      .then(([ response, body ]) => {
        console.log(response.statusCode);
        console.log(response.body);
      })
      .catch(error => {

        console.error(error);
      });
  }
}