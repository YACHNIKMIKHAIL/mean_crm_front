import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "../../services/categories.service";
import { CategoryInterface } from "../../../../shared/interfaces/category.interface";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
      selector: "crm-current-category",
      templateUrl: "./current-category.component.html",
      styleUrls: ["./current-category.component.css"],
})
export class CurrentCategoryComponent implements OnInit {
      category!: Observable<CategoryInterface>;
      constructor(
            private categoriesService: CategoriesService,
            private route: ActivatedRoute,
      ) {}
      ngOnInit(): void {
            const currentCategoryId = this.route.snapshot.params["id"];
            this.category =
                  this.categoriesService.getCurrentCategory(currentCategoryId);
      }
}
