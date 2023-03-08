import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./components/categories.component";
import { RouterLink } from "@angular/router";
import { CategoryForm } from "./components/category-form/category-form";
import { LoaderModule } from "../../shared/components/loader/loader.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PositionsFormComponent } from "./components/category-form/positions-form/positions-form.component";

@NgModule({
      declarations: [CategoriesComponent, CategoryForm, PositionsFormComponent],
      imports: [CommonModule, RouterLink, LoaderModule, ReactiveFormsModule],
})
export class CategoriesModule {}
