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
  in = 'in',
}

export const CLIENT_ROLE = 'client';

export const ADMIN_ROLE = 'admin';

export const TENANT_ROLE = 'tenant';

export enum Roles {
  CLIENT = 'client',
  ADMIN = 'admin',
  TENANT = 'tenant',
}

export enum MARKET {
  ES = 'ES',
}

export interface HttpMethod {
  POST: 'POST';
  GET: 'GET';
}

export type TabemanoSession = {
  name: string;
  email: string;
  permissions: [];
  iat: number;
  id: string;
  urlList: string[];
  role: string;
};

export const SENDGRID = 'SendGrid';

export enum ErrorCode {
  DATA_FORMAT = 0,
  NOT_FOUND = 1,
  EXTERNAL_PROVIDER_ERROR = 2,
  APPLICATION_ERROR = 3,
  AUTHORIZATION_ERROR = 4,
}

export type ErrorSerialization = {
  errorType: string;
  errorCode: number;
  occurredOn: Date;
  message: string;
  stack?: string[];
};

export enum Allergens {
  MOLLUSC = 'mollusc',
  CRUSTACEAN = 'crustacean',
  FISH = 'fish',
  EGG = 'egg',
  MILK = 'milk',
  PEANUT = 'peanut',
  SOY = 'soy',
  TREE_NUT = 'tree nut',
  CEREAL = 'cereal',
  SESAME = 'sesame',
  MUSTARD = 'mustard',
  CELERY = 'celery',
  LUPIN = 'lupin',
  SULPHITE = 'sulphite',
}

export enum Diets {
  CARNIVORE = 'carnivore',
  OMNIVOROUS = 'omnivorous',
  VEGAN = 'vegan',
  VEGETARIAN = 'vegetarian',
  PREGNANT = 'pregnant',
}
