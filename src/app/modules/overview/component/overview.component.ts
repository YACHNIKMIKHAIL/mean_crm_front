import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "../../../shared/services/analytics/analytics.service";
import { AnalyticsOverviewResponseInterfaces } from "../../../shared/services/analytics/analytics.interfaces";
import { Observable } from "rxjs";

@Component({
      selector: "crm-overview",
      templateUrl: "./overview.component.html",
      styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
      overview$: Observable<AnalyticsOverviewResponseInterfaces> | undefined;
      constructor(private analyticsService: AnalyticsService) {}

      ngOnInit(): void {
            this.overview$ = this.analyticsService.getOverview();
      }
}
