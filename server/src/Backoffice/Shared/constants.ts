export const YEARLY_PRICING = 'yearly';
export const QUARTERLY_PRICING = 'quarterly';
export const MONTHLY_PRICING = 'monthly';

export const LANG_ES = 'ES';

export enum SUBSCRIPTION_STATUS {
  CREATED = 'created',
  EXPIRED = 'expired',
  ABOUT_TO_EXPIRE = 'about_to_expire',
  INACTIVE = 'inactive'
}

export const CHECK_FOR_EXPIRED_CLIENT_SUBSCRIPTION_JOB = 'CHECK_FOR_EXPIRED_CLIENT_SUBSCRIPTION_JOB';
export const CHECK_ABOUT_TO_EXPIRE_SUBSCRIPTION_JOB = 'CHECK_ABOUT_TO_EXPIRE_SUBSCRIPTION_JOB';

export const TRACKING_TYPE = {
  click: 'click',
  open: 'open',
} as const;

export type TrackingType = typeof TRACKING_TYPE[keyof typeof TRACKING_TYPE];