import { Component } from "@angular/core";

interface HistoryInterface {
      orderNumber: number;
      date: Date;
      time: Date;
      sum: string;
}
@Component({
      selector: "crm-history",
      templateUrl: "./history.component.html",
      styleUrls: ["./history.component.css"],
})
export class HistoryComponent {
      historyList: HistoryInterface[] = [
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
            {
                  orderNumber: 1,
                  date: new Date(),
                  time: new Date(),
                  sum: "12 211",
            },
      ];

      trackByTime(index: number, item: HistoryInterface) {
            return item.time;
      }
}
