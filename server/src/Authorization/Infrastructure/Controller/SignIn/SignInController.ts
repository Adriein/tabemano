import { Body, ClassSerializerInterceptor, Controller, Post, Session, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { QueryBus } from "@nestjs/cqrs";
import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInResponse } from "Authorization/Application/SignIn/SignInResponse";
import { SignInApiRequest } from "Authorization/Infrastructure/Controller/SignIn/SignInApiRequest";
import jwt from "jsonwebtoken";

@Controller('/signin')
export class SignInController {
  constructor(private readonly queryBus: QueryBus, private readonly config: ConfigService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async signIn(
    @Body() body: SignInApiRequest,
    @Session() session: any
  ): Promise<SignInResponse> {
    const query = SignInQuery.fromJson(body);

    const response = await this.queryBus.execute<SignInQuery, SignInResponse>(query);

    session.user = jwt.sign(
      {
        name: response.name,
        email: response.email
      },
      this.config.get<string>('JWT_KEY')!,
    );

    return response;
  }
}