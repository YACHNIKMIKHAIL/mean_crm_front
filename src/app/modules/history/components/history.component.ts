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
import { Subject, takeUntil } from "rxjs";
import { OrderInterface } from "../../../shared/interfaces/position.interface";
import { environment } from "../../../../enviroments/environment";
import { FilterInterface } from "../../../shared/interfaces/filter.interface";

@Component({
      selector: "crm-history",
      templateUrl: "./history.component.html",
      styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements AfterViewInit, OnDestroy, OnInit {
      showFilter = false;
      offset = 0;
      limit = environment.STEP;
      filterTooltip!: MaterialInterface;
      historyList: OrderInterface[] = [];
      isAlive = new Subject<void>();
      @ViewChild("tooltip") tooltipRef: ElementRef | undefined;
      loadingFlag = false;
      reloadingFlag = false;
      noMoreFlag = false;
      private filter: FilterInterface = {};
      constructor(
            private materialService: MaterialService,
            private httpOrdersService: HttpOrdersService,
      ) {}
      triggerFilter() {
            this.showFilter = !this.showFilter;
            this.changeTooltipNotification();
            if (!this.showFilter && !!Object.keys(this.filter).length) {
                  this.historyList = [];
                  this.filter = {};
                  this.fetch();
            }
      }

      loadMore() {
            this.loadingFlag = true;
            this.offset += environment.STEP;
            this.fetch();
      }

      ngAfterViewInit(): void {
            this.filterTooltip = this.materialService.initTooltip(
                  this.tooltipRef?.nativeElement,
            );
      }

      ngOnDestroy(): void {
            this.isAlive.next();
            this.isAlive.complete();
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
            this.reloadingFlag = true;
            this.fetch();
      }

      private fetch() {
            const params = Object.assign({}, this.filter, {
                  offset: this.offset,
                  limit: this.limit,
            });
            this.httpOrdersService
                  .getAllOrders(params)
                  .pipe(takeUntil(this.isAlive))
                  .subscribe(data => {
                        this.historyList = this.historyList.concat(data);
                        this.loadingFlag = false;
                        this.reloadingFlag = false;
                        this.noMoreFlag = data.length < this.limit;
                  });
      }

      applyFilter($event: FilterInterface) {
            this.historyList = [];
            this.offset = 0;
            this.filter = $event;
            this.reloadingFlag = true;
            this.fetch();
      }

      isFiltered(): boolean {
            return !!Object.keys(this.filter).length;
      }
}
