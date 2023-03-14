import {
      AfterViewInit,
      Component,
      ElementRef,
      OnDestroy,
      ViewChild,
} from "@angular/core";
import { AnalyticsService } from "../../../shared/services/analytics/analytics.service";
import { AnalyticsInterface } from "../../../shared/interfaces/analyticsInterface";
import { Subject, takeUntil } from "rxjs";
import {
      Chart,
      ChartConfiguration,
      ChartTypeRegistry,
      registerables,
} from "chart.js";

@Component({
      selector: "crm-analytics",
      templateUrl: "./analytics.component.html",
      styleUrls: ["./analytics.component.css"],
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
      analytics: AnalyticsInterface | undefined;
      average: number | undefined;
      pending = true;
      isAlive = new Subject<void>();
      @ViewChild("gain") gainRef: ElementRef | undefined;
      @ViewChild("order") orderRef: ElementRef | undefined;
      constructor(private analyticsService: AnalyticsService) {
            Chart.register(...registerables);
      }

      ngAfterViewInit(): void {
            const gainConfig: any = {
                  label: "Gain",
                  color: "rgb(255,99,132)",
            };
            const orderConfig: any = {
                  label: "Order",
                  color: "#26a69a",
            };

            this.analyticsService
                  .getAnalytics()
                  .pipe(takeUntil(this.isAlive))
                  .subscribe(data => {
                        this.average = data.average;

                        gainConfig.labels = data.chart.map(item => item.label);
                        gainConfig.data = data.chart.map(item => item.gain);

                        orderConfig.labels = data.chart.map(item => item.label);
                        orderConfig.data = data.chart.map(item => item.order);

                        const gainContext =
                              this.gainRef?.nativeElement.getContext("2d");
                        gainContext.canvas.height = "300px";

                        const orderContext =
                              this.orderRef?.nativeElement.getContext("2d");
                        orderContext.canvas.height = "300px";

                        new Chart(gainContext, generateChartConfig(gainConfig));
                        new Chart(
                              orderContext,
                              generateChartConfig(orderConfig),
                        );

                        this.pending = false;
                  });
      }

      ngOnDestroy(): void {
            this.isAlive.next();
            this.isAlive.complete();
      }
}

function generateChartConfig({ labels, data, label, color }: any) {
      return {
            type: "line",
            data: {
                  labels: labels,
                  datasets: [
                        {
                              label,
                              data,
                              fill: false,
                              borderColor: color,
                              tension: 0.1,
                        },
                  ],
            },
      } as ChartConfiguration<keyof ChartTypeRegistry, any, unknown>;
}
