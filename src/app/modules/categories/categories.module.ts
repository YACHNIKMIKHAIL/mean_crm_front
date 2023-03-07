import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./component/categories.component";
import { RouterLink } from "@angular/router";
import { AddNewCategoryComponent } from "./component/add-new-category/add-new-category.component";
import { LoaderModule } from "../../shared/components/loader/loader.module";

@NgModule({
      declarations: [CategoriesComponent, AddNewCategoryComponent],
      imports: [CommonModule, RouterLink, LoaderModule],
})
export class CategoriesModule {}
