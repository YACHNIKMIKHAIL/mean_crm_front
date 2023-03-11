import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { OrderInterface } from "../../../../../shared/interfaces/position.interface";

@Component({
      selector: "crm-history-list",
      templateUrl: "./history-list.component.html",
      styleUrls: ["./history-list.component.css"],
})
export class HistoryListComponent {
      @Input("historyList") historyListProps:
            | Observable<OrderInterface[]>
            | undefined;
      triggerModal() {}

      calculateCost(historyItem: OrderInterface): number {
            return historyItem.list.reduce((acc, el) => {
                  return acc += el.cost;
            }, 0);
      }
}
