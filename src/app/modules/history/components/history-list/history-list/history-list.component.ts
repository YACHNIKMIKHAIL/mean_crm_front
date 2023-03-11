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
      selectedOrder!: OrderInterface;
      @Input("historyList") historyListProps!: OrderInterface[] | null;
      @ViewChild("modal") modalRef!: ElementRef;
      constructor(private materialService: MaterialService) {}

      selectOrder(item: OrderInterface) {
            this.selectedOrder = item;
            this.modalWindow.open();
      }

      calculateTotalCost(historyItem: OrderInterface): number {
            return historyItem.list.reduce((acc, el) => {
                  return (acc += el.quantity ? el.cost * el.quantity : el.cost);
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
}
