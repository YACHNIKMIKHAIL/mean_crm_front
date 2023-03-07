import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./component/categories.component";
import { RouterLink } from "@angular/router";
import { AddNewCategoryComponent } from "./component/add-new-category/add-new-category.component";

@NgModule({
      declarations: [CategoriesComponent, AddNewCategoryComponent],
      imports: [CommonModule, RouterLink],
})
export class CategoriesModule {}
