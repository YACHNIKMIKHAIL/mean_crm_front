import { Component, OnInit } from "@angular/core";
import { PositionsService } from "../../../../shared/services/positions/positions.service";
import { ActivatedRoute, Params } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";
import { PositionWithQuantityInterface } from "../../../../shared/interfaces/position.interface";
import { OrderService as AppOrdersService } from "../../service/order.service";
import { MaterialService } from "../../../../shared/classes/material.service";

@Component({
      selector: "app-order-positions",
      templateUrl: "./order-positions.component.html",
      styleUrls: ["./order-positions.component.css"],
})
export class OrderPositionsComponent implements OnInit {
      positions$!: Observable<PositionWithQuantityInterface[]>;
      constructor(
            private positionsService: PositionsService,
            private route: ActivatedRoute,
            private appOrderService: AppOrdersService,
            private materialService: MaterialService,
      ) {}

      ngOnInit(): void {
            this.positions$ = this.route.params.pipe(
                  switchMap((params: Params) => {
                        return this.positionsService.getAllPositions(
                              params["id"],
                        );
                  }),
                  map(positions => positions.map(p => ({ ...p, quantity: 1 }))),
            );
      }

      addToOrder(position: PositionWithQuantityInterface) {
            this.materialService.toast(
                  `Position ${position.name} x${position.quantity} is added.`,
            );
            this.appOrderService.add(position);
      }
}
