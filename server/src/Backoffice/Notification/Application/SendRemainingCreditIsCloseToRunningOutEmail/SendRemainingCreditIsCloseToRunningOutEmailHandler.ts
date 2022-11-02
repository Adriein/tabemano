export class SendRemainingCreditIsCloseToRunningOutEmailHandler {
  constructor() {}
  

  public async handle(): Promise<void> {
    // Option 1 -> Receive by arg the calculated diff between remaining credit and min credit before notifying
    
    // Option 2 -> Receive by arg the name of the service that is close to running out of credits
        // Find the service by name
        // Call the domain method to calculateDifferenceBetweenRemainingCreditAndMinRemainingCreditBeforeNotifying
  }
}
