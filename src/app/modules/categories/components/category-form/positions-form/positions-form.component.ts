import { Component, Input, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { PositionsService } from "../../../../../shared/services/positions/positions.service";

export interface PositionInterface {
      name: string;
      cost: number;
      category: string;
      user: string;
}
@Component({
      selector: "crm-positions-form",
      templateUrl: "./positions-form.component.html",
      styleUrls: ["./positions-form.component.css"],
})
export class PositionsFormComponent implements OnInit {
      positions$: Observable<PositionInterface[] | null> = of(null);
      @Input("categoryId") categoryIdProps: string | undefined;

      constructor(private positionsService: PositionsService) {}

      ngOnInit(): void {
            if (this.categoryIdProps) {
                  this.positions$ = this.positionsService.getAllPositions(
                        this.categoryIdProps,
                  );
            }
      }
}
