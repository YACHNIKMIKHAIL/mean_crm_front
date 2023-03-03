import { Component } from "@angular/core";
import { AuthFormInterface } from "../../../shared/types/auth.types";

@Component({
      selector: "app-register",
      templateUrl: "./register.component.html",
      styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
      register($event: AuthFormInterface) {
            console.log("RegisterComponent", $event);
      }
}
