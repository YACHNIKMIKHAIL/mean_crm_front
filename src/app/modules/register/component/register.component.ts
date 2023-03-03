import { Component } from "@angular/core";

@Component({
      selector: "app-register",
      templateUrl: "./register.component.html",
      styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
      register($event: { email: string; password: string }) {
            console.log("RegisterComponent", $event);
      }
}
