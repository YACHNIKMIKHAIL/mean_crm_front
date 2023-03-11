import {
      AfterViewInit,
      Component,
      ElementRef,
      Input,
      OnDestroy,
      ViewChild,
} from "@angular/core";
import {
      OrderInterface,
      PositionWithQuantityInterface,
} from "../../../../../shared/interfaces/position.interface";
import {
      MaterialInterface,
      MaterialService,
} from "../../../../../shared/classes/material.service";

@Component({
      selector: "crm-history-list",
      templateUrl: "./history-list.component.html",
      styleUrls: ["./history-list.component.css"],
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
      modalWindow!: MaterialInterface;
      historyItem!: OrderInterface;
      @Input("historyList") historyListProps!: OrderInterface[] | null;
      @ViewChild("modal") modalRef!: ElementRef;
      constructor(private materialService: MaterialService) {}
      triggerModal(id: string) {
            if (this.historyListProps) {
                  this.historyItem = this.historyListProps.filter(
                        o => o._id === id,
                  )[0];
            }
            console.log("triggerModal", this.historyItem);
            this.modalWindow.open();
      }

      calculateCost(historyItem: OrderInterface): number {
            return historyItem.list.reduce((acc, el) => {
                  return (acc += el.cost);
            }, 0);
      }

      trackById(index: number, item: OrderInterface) {
            return item._id;
      }

      ngAfterViewInit(): void {
            this.modalWindow = this.materialService.initModal(
                  this.modalRef.nativeElement,
            );
      }

      closeModal() {
            this.modalWindow.close();
      }

      ngOnDestroy(): void {
            this.modalWindow.destroy();
      }

      calculateCostOfOrder(list: PositionWithQuantityInterface[]) {
            return list.reduce((acc, el) => {
                  return (acc += el.cost);
            }, 0);
      }
}
