import { Component, OnInit } from "@angular/core";
import { RouterPathsEnum } from "../../../../shared/enums/routerPaths.enum";
import { CategoriesService } from "../../../../shared/services/categories/categories.service";
import { Observable } from "rxjs";
import { CategoryInterface } from "../../../../shared/interfaces/category.interface";
import { Router } from "@angular/router";

@Component({
      selector: "app-order-categories",
      templateUrl: "./order-categories.component.html",
      styleUrls: ["./order-categories.component.css"],
})
export class OrderCategoriesComponent implements OnInit {
      routerPathsEnum = RouterPathsEnum;
      categories$!: Observable<CategoryInterface[]>;
      constructor(
            private categoriesService: CategoriesService,
            private router: Router,
      ) {}
      trackByIndex(index: number) {
            return index;
      }

      ngOnInit(): void {
            this.categories$ = this.categoriesService.getAllCategories();
      }

      jumpToPositionsOfCategory(id: string) {
            this.router.navigate([this.routerPathsEnum.ORDER, id], {
                  queryParams: { id },
            });
      }
}
