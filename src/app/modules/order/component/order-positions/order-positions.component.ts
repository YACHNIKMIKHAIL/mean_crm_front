import { Component, OnInit } from "@angular/core";
import { PositionsService } from "../../../../shared/services/positions/positions.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { PositionInterface } from "../../../../shared/interfaces/position.interface";

@Component({
      selector: "app-order-positions",
      templateUrl: "./order-positions.component.html",
      styleUrls: ["./order-positions.component.css"],
})
export class OrderPositionsComponent implements OnInit {
      positions$!: Observable<PositionInterface[]>;
      constructor(
            private positionsService: PositionsService,
            private route: ActivatedRoute,
      ) {}

      ngOnInit(): void {
            this.route.queryParams.subscribe(params => {
                  if (params["id"]) {
                        this.positions$ = this.positionsService.getAllPositions(
                              params["id"],
                        );
                  }
            });
      }
}
