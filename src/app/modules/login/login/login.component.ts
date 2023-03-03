import { Component } from "@angular/core";

@Component({
      selector: "crm-login",
      templateUrl: "./login.component.html",
      styleUrls: ["./login.component.css"],
})
export class LoginComponent {
      login($event: { email: string; password: string }) {
            console.log("LoginComponent", $event);
      }
}
