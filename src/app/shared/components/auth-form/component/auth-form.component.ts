import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
      FormBuilder,
      FormControl,
      FormGroup,
      Validators,
} from "@angular/forms";
import { UserInterface } from "../../../interfaces/auth.interface";

@Component({
      selector: "crm-auth-form",
      templateUrl: "./auth-form.component.html",
      styleUrls: ["./auth-form.component.css"],
})
export class AuthFormComponent implements OnInit {
      @Input("title") titleProps!: string;
      @Input("buttonTitle") buttonTitleProps!: string;
      @Output() emitAuthForm = new EventEmitter<UserInterface>();
      authForm!: FormGroup;

      requiredPasswordLength = 3;

      emailIsValid(): boolean {
            return (
                  this.authForm.controls["email"].errors &&
                  this.authForm.controls["email"].errors["email"]
            );
      }

      constructor(private fb: FormBuilder) {}
      submitForm() {
            this.authForm.disable();
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
