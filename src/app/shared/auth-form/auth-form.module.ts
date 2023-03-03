import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthFormComponent } from "./component/auth-form.component";

@NgModule({
      declarations: [AuthFormComponent],
      exports: [AuthFormComponent],
      imports: [CommonModule],
})
export class AuthFormModule {}
