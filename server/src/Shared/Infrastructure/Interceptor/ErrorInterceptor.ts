import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler, BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DomainError } from "Shared/Domain/Error/DomainError";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => {
          if (err instanceof DomainError) {
            return throwError(() => new BadRequestException({
              errorType: 'DomainError',
              statusCode: 400,
              message: err.message,
              stack: err.stack?.split('\n').map((trace: string) => trace.trim())
            }));
          }

          return throwError(err);
        }),
      );
  }
}
