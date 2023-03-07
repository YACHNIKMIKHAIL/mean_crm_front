import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../../interfaces/auth.interface";
import { Observable, tap } from "rxjs";
import { SavingToLocalStorageService } from "../savingToLocalStorage/saving-to-local-storage.service";
import { environment } from "../../../../enviroments/environment";

@Injectable({
      providedIn: "root",
})
export class AuthService {
      constructor(
            private http: HttpClient,
            private savingToLocalStorageService: SavingToLocalStorageService,
      ) {}

      login(payload: UserInterface): Observable<{ token: string }> {
            return this.http
                  .post<{ token: string }>(
                        `${environment.urls.auth}/login`,
                        payload,
                  )
                  .pipe(
                        tap(({ token }) =>
                              this.savingToLocalStorageService.saveToken(token),
                        ),
                  );
      }

      register(user: UserInterface): Observable<UserInterface> {
            return this.http.post<any>(
                  `${environment.urls.auth}/register`,
                  user,
            );
      }

      isAuthenticated(): boolean {
            return !!this.savingToLocalStorageService.getToken();
      }

      logout() {
            this.savingToLocalStorageService.saveToken(null);
      }
}
