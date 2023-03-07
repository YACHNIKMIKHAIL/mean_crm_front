import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./component/categories.component";
import { RouterLink } from "@angular/router";

@NgModule({
      declarations: [CategoriesComponent],
      imports: [CommonModule, RouterLink],
})
export class CategoriesModule {}
