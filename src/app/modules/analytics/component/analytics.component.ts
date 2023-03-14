import {
      AfterViewInit,
      Component,
      ElementRef,
      ViewChild,
} from "@angular/core";
import { AnalyticsService } from "../../../shared/services/analytics/analytics.service";
import { AnalyticsInterface } from "../../../shared/interfaces/analyticsInterface";
import { Observable } from "rxjs";

@Component({
      selector: "crm-analytics",
      templateUrl: "./analytics.component.html",
      styleUrls: ["./analytics.component.css"],
})
export class AnalyticsComponent implements AfterViewInit {
      analytics$: Observable<AnalyticsInterface> | undefined;
      @ViewChild("gain") gainRef: ElementRef | undefined;
      @ViewChild("order") orderRef: ElementRef | undefined;
      constructor(private analyticsService: AnalyticsService) {}

      ngAfterViewInit(): void {
            this.analytics$ = this.analyticsService.getAnalytics();
            // this.analyticsService
            //       .getAnalytics()
            //       .subscribe(data => console.log(data));
      }
}
