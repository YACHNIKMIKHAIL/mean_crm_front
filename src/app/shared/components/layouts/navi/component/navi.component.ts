import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { NaviInterface } from "../navi.interface";
import { RouterPathsEnum } from "../../../../enums/routerPaths.enum";
import { AuthService } from "../../../../services/auth/auth.service";
import { MaterialService } from "../../../../classes/material.service";

@Component({
      selector: "crm-navi",
      templateUrl: "./navi.component.html",
      styleUrls: ["./navi.component.css"],
})
export class NaviComponent implements AfterViewInit {
      routerPathsEnum = RouterPathsEnum;
      @ViewChild("floatingB") floatingRef!: ElementRef;
      linksList: NaviInterface[] = [
            { path: RouterPathsEnum.OVERVIEW, title: "Overview" },
            { path: RouterPathsEnum.ANALYTICS, title: "Analytics" },
            { path: RouterPathsEnum.HISTORY, title: "History" },
            { path: RouterPathsEnum.ORDER, title: "Add order" },
            { path: RouterPathsEnum.CATEGORIES, title: "Categories" },
      ];
      constructor(
            private authService: AuthService,
            private materialService: MaterialService,
      ) {}

      logout() {
            this.authService.logout();
      }

      ngAfterViewInit(): void {
            this.materialService.initializeFloatingButton(this.floatingRef);
      }

      trackByName(index: number, item: NaviInterface): string {
            return item.title;
      }
}
