import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../../app.component";

// const routes: Routes = [
//       { path: "login", component: LoginComponent },
// ];

@NgModule({
      declarations: [LoginComponent],
      imports: [
            CommonModule,
            // RouterModule.forChild(routes)
      ],
})
export class LoginModule {}
