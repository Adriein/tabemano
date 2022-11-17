import { Result } from "@badrap/result";
import { Email } from "Backoffice/Shared/Domain/Email/Email";
import { ExternalServiceError } from "Shared/Domain/Error/ExternalServiceError";

export interface ISmtpService {
  send(email: Email): Promise<Result<null, ExternalServiceError>>;
}