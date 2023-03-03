import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./shared/layouts/header/component/header.component";
import { NaviComponent } from "./shared/layouts/navi/component/navi.component";
import { LoginComponent } from "./modules/login/login/login.component";
import { RegisterComponent } from "./modules/register/component/register.component";

const routes: Routes = [
      {
            path: "",
            component: HeaderComponent,
            children: [
                  { path: "", redirectTo: "login", pathMatch: "full" },
                  {
                        path: "login",
                        component: LoginComponent,
                  },
                  {
                        path: "register",
                        component: RegisterComponent,
                  },
            ],
      },
      {
            path: "xxx",
            component: NaviComponent,
            children: [
                  {
                        path: "login",
                        component: LoginComponent,
                  },
            ],
      },
];

@NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
})
export class AppRoutingModule {}
