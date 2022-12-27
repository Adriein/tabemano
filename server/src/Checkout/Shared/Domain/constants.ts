export const PAYMENT_ATTEMPT_STATUS = {
  started: 'started',
  completed: 'completed',
  disputed: 'disputed',
  failed: 'failed',
} as const;

export type TrackingType = typeof PAYMENT_ATTEMPT_STATUS[keyof typeof PAYMENT_ATTEMPT_STATUS];