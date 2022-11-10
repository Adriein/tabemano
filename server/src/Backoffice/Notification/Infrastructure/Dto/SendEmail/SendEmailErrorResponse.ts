export interface SendEmailErrorResponse {
  response: {
    body: {
      errors: { field: string; message: string }[];
    };
  };
}
