import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./modules/login/login.module";
import { HeaderModule } from "./shared/layouts/header/header.module";
import { NaviModule } from "./shared/layouts/navi/navi.module";
import { RegisterModule } from "./modules/register/register.module";
import { HttpClientModule } from "@angular/common/http";

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
      ],
      providers: [],
      bootstrap: [AppComponent],
})
export class AppModule {}
