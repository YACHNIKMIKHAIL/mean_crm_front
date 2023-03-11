import {
      HttpErrorResponse,
      HttpEvent,
      HttpHandler,
      HttpInterceptor,
      HttpRequest,
      HttpResponse,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { PersistenceService } from "../services/persistance/persistence.service";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { RouterPathsEnum } from "../enums/routerPaths.enum";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
      constructor(
            private savingToLocalStorageService: PersistenceService,
            private authService: AuthService,
            private router: Router,
      ) {}
      intercept(
            req: HttpRequest<any>,
            next: HttpHandler,
      ): Observable<HttpEvent<any>> {
            if (this.authService.isAuthenticated()) {
                  const token =
                        this.savingToLocalStorageService.getToken() || "";
                  req = req.clone({
                        headers: req.headers.set("Authorization", token),
                  });
            }

            return next
                  .handle(req)
                  .pipe(
                        catchError((err: HttpErrorResponse) =>
                              this.handleAuthError(err),
                        ),
                  );
      }

      private handleAuthError(
            err: HttpErrorResponse,
      ): Observable<HttpResponse<HttpErrorResponse>> {
            if (err.status === 401) {
                  this.router.navigate([RouterPathsEnum.LOGIN], {
                        queryParams: {
                              sessionFailed: true,
                        },
                  });
            }
            return throwError(err);
      }
}
