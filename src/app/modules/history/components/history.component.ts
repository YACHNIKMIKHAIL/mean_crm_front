import {
      AfterViewInit,
      Component,
      ElementRef,
      OnDestroy,
      ViewChild,
} from "@angular/core";
import {
      MaterialInterface,
      MaterialService,
} from "../../../shared/classes/material.service";

@Component({
      selector: "crm-history",
      templateUrl: "./history.component.html",
      styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements AfterViewInit, OnDestroy {
      showFilter = false;
      filterTooltip!: MaterialInterface;
      @ViewChild("tooltip") tooltipRef: ElementRef | undefined;
      constructor(private materialService: MaterialService) {}
      triggerFilter() {
            this.showFilter = !this.showFilter;
            this.changeTooltipNotification();
      }

      loadMore() {
            console.log("load more");
      }

      ngAfterViewInit(): void {
            this.filterTooltip = this.materialService.initTooltip(
                  this.tooltipRef?.nativeElement,
            );
      }

      showTooltip() {
            this.filterTooltip.open();
      }

      ngOnDestroy(): void {
            this.filterTooltip.destroy();
      }

      private changeTooltipNotification() {
            if (this.showFilter) {
                  this.tooltipRef?.nativeElement.setAttribute(
                        "data-tooltip",
                        "Close tooltip",
                  );
            } else {
                  this.tooltipRef?.nativeElement.setAttribute(
                        "data-tooltip",
                        "Open tooltip",
                  );
            }
      }
}
