import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
      FormBuilder,
      FormControl,
      FormGroup,
      Validators,
} from "@angular/forms";
import { AuthFormInterface } from "../../types/auth.types";

@Component({
      selector: "crm-auth-form",
      templateUrl: "./auth-form.component.html",
      styleUrls: ["./auth-form.component.css"],
})
export class AuthFormComponent implements OnInit {
      @Input("title") titleProps!: string;
      @Input("buttonTitle") buttonTitleProps!: string;
      @Output() emitAuthForm = new EventEmitter<AuthFormInterface>();
      authForm!: FormGroup;

      requiredPasswordLength = 6;

      emailIsValid(): boolean {
            return (
                  this.authForm.controls["email"].errors &&
                  this.authForm.controls["email"].errors["email"]
            );
      }

      constructor(private fb: FormBuilder) {}
      submitForm() {
            this.emitAuthForm.emit(this.authForm.value);
      }

      ngOnInit(): void {
            this.authForm = this.fb.group({
                  email: new FormControl(null, [
                        Validators.required,
                        Validators.email,
                  ]),
                  password: new FormControl(null, [
                        Validators.required,
                        Validators.minLength(this.requiredPasswordLength),
                  ]),
            });
      }
}
