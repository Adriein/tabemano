import { Body, ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CheckPermissionQuery } from 'Authorization/Application/CheckPermission/CheckPermissionQuery';
import { CheckPermissionResponse } from 'Authorization/Application/CheckPermission/CheckPermissionResponse';
import { CheckPermissionApiRequest } from './CheckPermissionApiRequest';
import { CheckPermissionApiResponse } from './CheckPermissionApiResponse';

@Controller('/permissions/check')
export class CheckPermissionController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async checkPermissionController(
    @Body() body: CheckPermissionApiRequest
  ): Promise<CheckPermissionApiResponse> {
    const query = CheckPermissionQuery.fromJson(body);

    const response = await this.queryBus.execute<CheckPermissionQuery, CheckPermissionResponse>(
      query
    );

    return response;
  }
}
