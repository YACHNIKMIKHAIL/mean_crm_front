import {
      AfterViewInit,
      Component,
      ElementRef,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import { AnalyticsService } from "../../../shared/services/analytics/analytics.service";
import { OverviewInterfaces } from "../../../shared/interfaces/analytics.interfaces";
import { Observable } from "rxjs";
import {
      MaterialInterface,
      MaterialService,
} from "../../../shared/classes/material.service";

@Component({
      selector: "crm-overview",
      templateUrl: "./overview.component.html",
      styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit, OnDestroy, AfterViewInit {
      overview$: Observable<OverviewInterfaces> | undefined;
      tapTarget: MaterialInterface | undefined;
      @ViewChild("tapTarget") tapTargetRef: ElementRef | undefined;
      constructor(
            private analyticsService: AnalyticsService,
            private materialService: MaterialService,
      ) {}

      ngOnInit(): void {
            this.overview$ = this.analyticsService.getOverview();
      }

      ngOnDestroy(): void {}

      ngAfterViewInit(): void {
            this.tapTarget = this.materialService.initTapTarget(
                  this.tapTargetRef?.nativeElement,
            );
      }

      openTabTarget() {
            this.tapTarget?.open();
      }
}
