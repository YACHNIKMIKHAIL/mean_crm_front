import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./shared/layouts/header/component/header.component";
import { NaviComponent } from "./shared/layouts/navi/component/navi.component";
import { LoginComponent } from "./modules/login/login/login.component";
import { RegisterComponent } from "./modules/register/component/register.component";
import { RouterPathsEnum } from "./shared/enums/routerPaths.enum";
import { AuthGuard } from "./shared/classes/auth.guard";

const routes: Routes = [
      {
            path: RouterPathsEnum.DEFAULT,
            component: HeaderComponent,
            children: [
                  {
                        path: RouterPathsEnum.DEFAULT,
                        redirectTo: RouterPathsEnum.LOGIN,
                        pathMatch: "full",
                  },
                  {
                        path: RouterPathsEnum.LOGIN,
                        component: LoginComponent,
                  },
                  {
                        path: RouterPathsEnum.REGISTER,
                        component: RegisterComponent,
                  },
            ],
      },
      {
            path: RouterPathsEnum.OVERVIEW,
            component: NaviComponent,
            canActivate: [AuthGuard],
            children: [
                  {
                        path: RouterPathsEnum.LOGIN,
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
