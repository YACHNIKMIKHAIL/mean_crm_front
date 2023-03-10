import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderComponent } from "./component/order.component";
import { OrderPositionsComponent } from "./component/order-positions/order-positions.component";
import { OrderCategoriesComponent } from "./component/order-categories/order-categories.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { LoaderModule } from "../../shared/components/loader/loader.module";
import { OrderService } from "./service/order.service";

@NgModule({
      declarations: [
            OrderComponent,
            OrderPositionsComponent,
            OrderCategoriesComponent,
      ],
      imports: [CommonModule, RouterOutlet, RouterLink, LoaderModule],
      providers: [OrderService],
})
export class OrderModule {}
