import { Component } from "@angular/core";
import {RouterPathsEnum} from "../../../../shared/enums/routerPaths.enum";

@Component({
      selector: "crm-add-new-category",
      templateUrl: "./add-new-category.component.html",
      styleUrls: ["./add-new-category.component.css"],
})
export class AddNewCategoryComponent {
  routerPathsEnum = RouterPathsEnum;
}
