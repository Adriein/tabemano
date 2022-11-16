import { applyDecorators, UseGuards } from '@nestjs/common';
import { ADMIN_ROLE, TENANT_ROLE } from 'Shared/Domain/constants';
import { AuthGuard } from '../Guard/AuthGuard';
import { PermissionGuard } from '../Guard/PermissionGuard';
import { RoleGuard } from '../Guard/RoleGuard';
import { Roles } from './Roles';

export function TenantGuard(): any {
  return applyDecorators(
    Roles(TENANT_ROLE, ADMIN_ROLE),
    UseGuards(AuthGuard, RoleGuard, PermissionGuard)
  );
}
