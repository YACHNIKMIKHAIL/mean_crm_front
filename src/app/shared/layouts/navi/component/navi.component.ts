import { Component } from "@angular/core";
import { NaviInterface } from "../navi.interface";
import { RouterPathsEnum } from "../../../enums/routerPaths.enum";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
      selector: "crm-navi",
      templateUrl: "./navi.component.html",
      styleUrls: ["./navi.component.css"],
})
export class NaviComponent {
      routerPathsEnum = RouterPathsEnum;
      constructor(private authService: AuthService) {}
      linksList: NaviInterface[] = [
            { path: RouterPathsEnum.OVERVIEW, title: "Review" },
            { path: RouterPathsEnum.ANALYTICS, title: "Analytics" },
            { path: RouterPathsEnum.STORY, title: "Story" },
            { path: RouterPathsEnum.ORDER, title: "Add order" },
            { path: RouterPathsEnum.RANGE, title: "Range" },
      ];

      logout() {
            this.authService.logout();
      }
}
