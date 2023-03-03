import { Component, Input } from "@angular/core";

@Component({
      selector: "crm-auth-form",
      templateUrl: "./auth-form.component.html",
      styleUrls: ["./auth-form.component.css"],
})
export class AuthFormComponent {
      @Input("title") titleProps!: string;
      @Input("buttonTitle") buttonTitleProps!: string;
}
