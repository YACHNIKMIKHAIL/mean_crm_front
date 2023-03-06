import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../../interfaces/auth.types";
import { Observable, tap } from "rxjs";
import { SavingToLocalStorageService } from "../savingToLocalStorage/saving-to-local-storage.service";

@Injectable({
      providedIn: "root",
})
export class AuthService {
      url = "/crm/auth";

      constructor(
            private http: HttpClient,
            private savingToLocalStorageService: SavingToLocalStorageService,
      ) {}

      login(payload: UserInterface): Observable<{ token: string }> {
            return this.http
                  .post<{ token: string }>(`${this.url}/login`, payload)
                  .pipe(
                        tap(({ token }) =>
                              this.savingToLocalStorageService.saveToken(token),
                        ),
                  );
      }

      register(user: UserInterface): Observable<UserInterface> {
            return this.http.post<any>(`${this.url}/register`, user);
      }

      isAuthenticated(): boolean {
            return !!this.savingToLocalStorageService.getToken();
      }

      logout() {
            this.savingToLocalStorageService.saveToken(null);
      }
}
