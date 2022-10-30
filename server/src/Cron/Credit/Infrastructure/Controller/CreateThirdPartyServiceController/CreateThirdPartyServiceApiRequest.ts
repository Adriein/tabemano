export interface CreateThirdPartyServiceApiRequest {
  name: string;
  remainingCredit: number;
  minRemainingCreditBeforeNotifying: number;
  notify: boolean;
}
