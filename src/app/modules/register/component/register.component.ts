import { Component } from "@angular/core";
import { UserInterface } from "../../../shared/interfaces/auth.types";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
      selector: "app-register",
      templateUrl: "./register.component.html",
      styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
      constructor(private authService: AuthService) {}
      register($event: UserInterface) {
            console.log("RegisterComponent");
            this.authService.register($event).subscribe(
                  () => console.log("register success"),
                  err => console.log("register failed", err),
            );
      }
}
