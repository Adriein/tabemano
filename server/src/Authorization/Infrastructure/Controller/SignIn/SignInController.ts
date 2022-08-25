import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetPermissionsQuery } from 'Authorization/Application/GetPermissions/GetPermissionsQuery';
import { GetPermissionsResponse } from 'Authorization/Application/GetPermissions/GetPermissionsResponse';
import { SignInQuery } from 'Authorization/Application/SignIn/SignInQuery';
import { SignInResponse } from 'Authorization/Application/SignIn/SignInResponse';
import { SignInApiRequest } from 'Authorization/Infrastructure/Controller/SignIn/SignInApiRequest';
import jwt from 'jsonwebtoken';

@Controller('/signin')
export class SignInController {
  constructor(private readonly queryBus: QueryBus, private readonly config: ConfigService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async signIn(
    @Body() body: SignInApiRequest,
    @Session() session: any
  ): Promise<SignInResponse> {
    const signInQuery = SignInQuery.fromJson(body);
    const permissionQuery = GetPermissionsQuery.fromJson(body);

    const signInResponse = await this.queryBus.execute<SignInQuery, SignInResponse>(signInQuery);

    const permissionsResponse = await this.queryBus.execute<
      GetPermissionsQuery,
      GetPermissionsResponse[]
    >(permissionQuery);

    const permissions = permissionsResponse.map(permission => {
      return { id: permission.moduleId, name: permission.moduleName };
    });

    session.user = jwt.sign(
      {
        name: signInResponse.name,
        email: signInResponse.email,
        permissions: permissions,
      },
      this.config.get<string>('JWT_KEY')!
    );

    return signInResponse;
  }
}
