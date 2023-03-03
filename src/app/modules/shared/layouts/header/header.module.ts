import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./component/header.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import { LoginModule } from "../../../login/login.module";

@NgModule({
      declarations: [HeaderComponent],
      imports: [CommonModule, RouterModule],
})
export class HeaderModule {}
