import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NaviComponent } from "./component/navi.component";
import { RouterOutlet } from "@angular/router";

@NgModule({
      declarations: [NaviComponent],
      imports: [CommonModule, RouterOutlet],
})
export class NaviModule {}
