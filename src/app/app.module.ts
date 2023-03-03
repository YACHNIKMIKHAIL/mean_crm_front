import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./modules/login/login.module";
import { HeaderModule } from "./modules/shared/layouts/header/header.module";
import { NaviModule } from "./modules/shared/layouts/navi/navi.module";
import { RegisterModule } from "./modules/register/register.module";

@NgModule({
      declarations: [AppComponent],
      imports: [
            BrowserModule,
            AppRoutingModule,
            LoginModule,
            HeaderModule,
            NaviModule,
            RegisterModule,
      ],
      providers: [],
      bootstrap: [AppComponent],
})
export class AppModule {}
