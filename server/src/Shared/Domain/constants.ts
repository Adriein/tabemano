export enum OPERATORS {
  equal = 'equals',
  gt = 'gt',
  lt = 'lt',
  gte = 'gte',
  lte = 'lte',
  ne = 'notIn',
  and = 'AND',
  or = 'OR',
  like = 'contains',
  order = 'orderBy',
  in = 'in'
}

export const CLIENT_ROLE = 'client';

export const ADMIN_ROLE = 'admin';

export const TENANT_ROLE = 'tenant';

export enum Roles {
  CLIENT = 'client',
  ADMIN = 'admin',
  TENANT = 'tenant'
}