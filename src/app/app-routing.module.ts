import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./shared/components/layouts/header/component/header.component";
import { NaviComponent } from "./shared/components/layouts/navi/component/navi.component";
import { LoginComponent } from "./modules/login/component/login.component";
import { RegisterComponent } from "./modules/register/component/register.component";
import { RouterPathsEnum } from "./shared/enums/routerPaths.enum";
import { AuthGuard } from "./shared/classes/auth.guard";
import { OverviewComponent } from "./modules/overview/component/overview.component";
import { AnalyticsComponent } from "./modules/analytics/component/analytics.component";
import { CategoriesComponent } from "./modules/categories/components/categories.component";
import { OrderComponent } from "./modules/order/component/order.component";
import { HistoryComponent } from "./modules/history/components/history.component";
import { CategoryForm } from "./modules/categories/components/category-form/category-form";
import { OrderCategoriesComponent } from "./modules/order/component/order-categories/order-categories.component";
import { OrderPositionsComponent } from "./modules/order/component/order-positions/order-positions.component";

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
            path: RouterPathsEnum.DEFAULT,
            component: NaviComponent,
            canActivate: [AuthGuard],
            children: [
                  {
                        path: RouterPathsEnum.OVERVIEW,
                        component: OverviewComponent,
                  },
                  {
                        path: RouterPathsEnum.ANALYTICS,
                        component: AnalyticsComponent,
                  },
                  {
                        path: RouterPathsEnum.HISTORY,
                        component: HistoryComponent,
                  },
                  {
                        path: RouterPathsEnum.ORDER,
                        component: OrderComponent,
                        children: [
                              {
                                    path: RouterPathsEnum.DEFAULT,
                                    component: OrderCategoriesComponent,
                              },
                              {
                                    path: RouterPathsEnum.ID,
                                    component: OrderPositionsComponent,
                              },
                        ],
                  },
                  {
                        path: RouterPathsEnum.CATEGORIES,
                        component: CategoriesComponent,
                  },
                  {
                        path: `${RouterPathsEnum.CATEGORIES}/${RouterPathsEnum.NEW}`,
                        component: CategoryForm,
                  },
                  {
                        path: `${RouterPathsEnum.CATEGORIES}/${RouterPathsEnum.ID}`,
                        component: CategoryForm,
                  },
            ],
      },
];

@NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
})
export class AppRoutingModule {}
