import { applyDecorators, UseGuards } from '@nestjs/common';
import { ADMIN_ROLE } from 'Shared/Domain/constants';
import { AuthGuard } from '../Guard/AuthGuard';
import { RoleGuard } from '../Guard/RoleGuard';
import { Roles } from './Roles';

export function AdminGuard(): any {
  return applyDecorators(Roles(ADMIN_ROLE), UseGuards(AuthGuard, RoleGuard));
}
