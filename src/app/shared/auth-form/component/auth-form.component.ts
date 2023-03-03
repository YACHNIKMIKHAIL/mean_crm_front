import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
      selector: "crm-auth-form",
      templateUrl: "./auth-form.component.html",
      styleUrls: ["./auth-form.component.css"],
})
export class AuthFormComponent implements OnInit {
      @Input("title") titleProps!: string;
      @Input("buttonTitle") buttonTitleProps!: string;
      @Output() emitForm = new EventEmitter<{
            email: string;
            password: string;
      }>();
      authForm!: FormGroup;

      constructor(private fb: FormBuilder) {}
      submitForm() {
            this.emitForm.emit(this.authForm.value);
      }

      ngOnInit(): void {
            this.authForm = this.fb.group({
                  email: new FormControl(""),
                  password: new FormControl(""),
            });
      }
}
