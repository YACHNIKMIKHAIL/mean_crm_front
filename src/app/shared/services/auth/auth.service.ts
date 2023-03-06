import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserInterface } from "../../interfaces/auth.types";
import { Observable } from "rxjs";

@Injectable({
      providedIn: "root",
})
export class AuthService {
      url = "/crm/auth";

      constructor(private http: HttpClient) {}

      login(payload: UserInterface): Observable<{ token: string }> {
            console.log("AuthService", payload);
            return this.http.post<{ token: string }>(
                  `${this.url}/login`,
                  payload,
            );
      }

      register(user: UserInterface): Observable<UserInterface> {
            return this.http.post<any>(`${this.url}/register`, user);
      }
}
