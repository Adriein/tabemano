import { Body, ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPermissionsQuery } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsQuery';
import { GetPermissionsResponse } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsResponse';
import { GetPermissionsApiRequest } from './GetPermissionsApiRequest';
import { GetPermissionsApiResponse } from './GetPermissionsApiResponse';

@Controller('/permissions')
export class GetPermissionsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async getPermissions(
    @Body() body: GetPermissionsApiRequest
  ): Promise<GetPermissionsApiResponse> {
    const query = GetPermissionsQuery.fromJson(body);

    return await this.queryBus.execute<GetPermissionsQuery, GetPermissionsResponse>(query);
  }
}
