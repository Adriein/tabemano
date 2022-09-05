import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetPermissionsQuery } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsQuery';
import { GetPermissionsResponse } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsResponse';
import { SignInQuery } from 'Authorization/Auth/Application/SignIn/SignInQuery';
import { SignInResponse } from 'Authorization/Auth/Application/SignIn/SignInResponse';
import { SignInApiRequest } from 'Authorization/Auth/Infrastructure/Controller/SignIn/SignInApiRequest';
import jwt from 'jsonwebtoken';
import { PermissionGuard } from 'Shared/Infrastructure/Guard/PermissionGuard';

@Controller('/signin')
export class SignInController {
  constructor(private readonly queryBus: QueryBus, private readonly config: ConfigService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(PermissionGuard)
  public async signIn(
    @Body() body: SignInApiRequest,
    @Session() session: any
  ): Promise<SignInResponse> {
    const signInQuery = SignInQuery.fromJson(body);

    const signInResponse = await this.queryBus.execute<SignInQuery, SignInResponse>(signInQuery);

    const permissionsResponse = await this.queryBus.execute<
      GetPermissionsQuery,
      GetPermissionsResponse[]
    >(new GetPermissionsQuery(signInResponse.id));

    const permissions = permissionsResponse.map(permission => {
      return { name: permission.moduleName, path: permission.modulePath };
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
