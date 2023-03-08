import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./components/categories.component";
import { RouterLink } from "@angular/router";
import { AddNewCategoryComponent } from "./components/add-new-category/add-new-category.component";
import { LoaderModule } from "../../shared/components/loader/loader.module";
import { CurrentCategoryComponent } from "./components/current-category/current-category.component";

@NgModule({
      declarations: [
            CategoriesComponent,
            AddNewCategoryComponent,
            CurrentCategoryComponent,
      ],
      imports: [CommonModule, RouterLink, LoaderModule],
})
export class CategoriesModule {}
