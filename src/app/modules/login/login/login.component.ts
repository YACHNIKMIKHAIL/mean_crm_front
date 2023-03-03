import { Component } from "@angular/core";
import { AuthFormInterface } from "../../../shared/types/auth.types";

@Component({
      selector: "crm-login",
      templateUrl: "./login.component.html",
      styleUrls: ["./login.component.css"],
})
export class LoginComponent {
      login($event: AuthFormInterface) {
            console.log("LoginComponent", $event);
      }
}
