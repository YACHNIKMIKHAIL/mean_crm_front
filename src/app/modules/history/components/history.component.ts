import {
      AfterViewInit,
      Component,
      ElementRef,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import {
      MaterialInterface,
      MaterialService,
} from "../../../shared/classes/material.service";
import { OrdersService as HttpOrdersService } from "../../../shared/services/orders/orders.service";
import { Observable } from "rxjs";
import { OrderInterface } from "../../../shared/interfaces/position.interface";

@Component({
      selector: "crm-history",
      templateUrl: "./history.component.html",
      styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements AfterViewInit, OnDestroy, OnInit {
      showFilter = false;
      filterTooltip!: MaterialInterface;
      historyList!: Observable<OrderInterface[]>;
      @ViewChild("tooltip") tooltipRef: ElementRef | undefined;
      constructor(
            private materialService: MaterialService,
            private httpOrdersService: HttpOrdersService,
      ) {}
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

      ngOnInit(): void {
            this.historyList = this.httpOrdersService.getAllOrders();
      }
}
