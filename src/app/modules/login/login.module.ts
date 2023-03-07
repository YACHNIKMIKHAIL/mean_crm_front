import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./component/login.component";
import { AuthFormModule } from "../../shared/auth-form/auth-form.module";

@NgModule({
      declarations: [LoginComponent],
      imports: [CommonModule, AuthFormModule],
})
export class LoginModule {}
