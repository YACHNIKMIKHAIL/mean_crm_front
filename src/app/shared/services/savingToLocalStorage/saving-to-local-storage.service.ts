import { Injectable } from "@angular/core";

@Injectable({
      providedIn: "root",
})
export class SavingToLocalStorageService {
      saveToken(token: string | null) {
            localStorage.setItem("crm-auth-token", JSON.stringify(token));
      }

      getToken() {
            return localStorage.getItem("crm-auth-token") || null;
      }
}
