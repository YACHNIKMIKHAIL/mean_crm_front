import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./modules/login/login.module";
import { HeaderModule } from "./shared/layouts/header/header.module";
import { NaviModule } from "./shared/layouts/navi/navi.module";
import { RegisterModule } from "./modules/register/register.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./shared/classes/token.interceptor";
import { OverviewModule } from "./modules/overview/overview.module";

@NgModule({
      declarations: [AppComponent],
      imports: [
            BrowserModule,
            AppRoutingModule,
            LoginModule,
            HeaderModule,
            NaviModule,
            RegisterModule,
            HttpClientModule,
            OverviewModule,
      ],
      providers: [
            {
                  provide: HTTP_INTERCEPTORS,
                  useClass: TokenInterceptor,
                  multi: true,
            },
      ],
      bootstrap: [AppComponent],
})
export class AppModule {}
