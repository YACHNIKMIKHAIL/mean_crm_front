import { Component } from "@angular/core";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";

interface CategoryInterface {
      link: string;
      title: string;
}
@Component({
      selector: "crm-categories",
      templateUrl: "./categories.component.html",
      styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent {
      categoriesList: CategoryInterface[] = [
            { link: "", title: "Category 1" },
            { link: "", title: "Category 2" },
            { link: "", title: "Category 3" },
            { link: "", title: "Category 4" },
            { link: "", title: "Category 5" },
      ];

      routerPathsEnum = RouterPathsEnum;

      trackByLink(index: number, item: CategoryInterface) {
            return item.link;
      }
}
