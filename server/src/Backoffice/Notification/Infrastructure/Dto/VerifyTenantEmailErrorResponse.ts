export interface VerifyTenantEmailErrorResponse {
  response: {
    body: {
      errors: { field: string, message: string }[]
    }
  }
}