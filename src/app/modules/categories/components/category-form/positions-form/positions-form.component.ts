import {
      AfterViewInit,
      Component,
      ElementRef,
      Input,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import { fromEvent, Observable, of } from "rxjs";
import { PositionsService } from "../../../../../shared/services/positions/positions.service";
import { PositionInterface } from "../../../../../shared/interfaces/position.interface";
import {
      MaterialInterface,
      MaterialService,
} from "../../../../../shared/classes/material.service";

@Component({
      selector: "crm-positions-form",
      templateUrl: "./positions-form.component.html",
      styleUrls: ["./positions-form.component.css"],
})
export class PositionsFormComponent
      implements OnInit, AfterViewInit, OnDestroy
{
      positions$: Observable<PositionInterface[] | null> = of(null);
      modal: MaterialInterface | undefined;
      @Input("categoryId") categoryIdProps: string | undefined;
      @ViewChild("addPosition", { static: true }) addPositionRef!: ElementRef;
      @ViewChild("modal") modalRef!: ElementRef;

      constructor(
            private positionsService: PositionsService,
            private materialService: MaterialService,
      ) {}

      ngOnInit(): void {
            if (this.categoryIdProps) {
                  this.positions$ = this.positionsService.getAllPositions(
                        this.categoryIdProps,
                  );
            }

            fromEvent(this.addPositionRef.nativeElement, "click").subscribe(
                  () => {
                        this.modal?.open();
                  },
            );
      }

      trackById(index: number, item: PositionInterface) {
            return item._id;
      }

      ngAfterViewInit(): void {
            this.modal = this.materialService.showModal(
                  this.modalRef.nativeElement,
            );
      }

      ngOnDestroy(): void {
            this.modal?.destroy();
      }

      selectPosition(position: PositionInterface) {
            console.log(position);
      }

      hideModal() {
            this.modal?.close();
      }

      submitPosition() {}
}
