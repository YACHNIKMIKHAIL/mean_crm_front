import {
      HttpEvent,
      HttpHandler,
      HttpInterceptor,
      HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { SavingToLocalStorageService } from "../services/savingToLocalStorage/saving-to-local-storage.service";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
      constructor(
            private savingToLocalStorageService: SavingToLocalStorageService,
            private authService: AuthService,
      ) {}
      intercept(
            req: HttpRequest<any>,
            next: HttpHandler,
      ): Observable<HttpEvent<any>> {
            if (this.authService.isAuthenticated()) {
                  const clone = req.clone({
                        headers: req.headers.set(
                              "Authorization",
                              this.savingToLocalStorageService.getToken() || "",
                        ),
                  });
                  return next.handle(clone);
            }

            return next.handle(req);
      }
}
