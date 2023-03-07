import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";
import { CategoriesService } from "../services/categories.service";
import { Subscription } from "rxjs";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";

@Component({
      selector: "crm-categories",
      templateUrl: "./categories.component.html",
      styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit, OnDestroy {
      categoriesList!: CategoryInterface[];
      categoriesListSubscription!: Subscription;
      isLoading = true;

      routerPathsEnum = RouterPathsEnum;

      constructor(private categoriesService: CategoriesService) {}

      trackById(index: number, item: CategoryInterface) {
            return item._id;
      }

      ngOnInit(): void {
            this.categoriesListSubscription = this.categoriesService
                  .getAllCategories()
                  .subscribe(categories => {
                        this.categoriesList = categories;
                        this.isLoading = false;
                  });
      }

      ngOnDestroy(): void {
            this.categoriesListSubscription.unsubscribe();
      }
}
