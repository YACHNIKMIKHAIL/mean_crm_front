import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterPathsEnum } from "../../../../shared/enums/routerPaths.enum";
import { Subscription } from "rxjs";
import { CategoryInterface } from "../../../../shared/interfaces/category.interface";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
      selector: "crm-category-form",
      templateUrl: "./category-form.html",
      styleUrls: ["./category-form.css"],
})
export class CategoryForm implements OnInit, OnDestroy {
      category: CategoryInterface = {
            name: "",
            imageSrc: "",
      };
      categorySubscription = new Subscription();
      categoryForm!: FormGroup;
      routerPathsEnum = RouterPathsEnum;

      constructor(
            private categoriesService: CategoriesService,
            private route: ActivatedRoute,
      ) {}

      ngOnInit(): void {
            const id = this.route.snapshot.params["id"];
            if (id) {
                  this.categorySubscription = this.categoriesService
                        .getCurrentCategory(id)
                        .subscribe(category => {
                              this.category = category;
                        });
            }
      }

      ngOnDestroy(): void {
            this.categorySubscription.unsubscribe();
      }
}
