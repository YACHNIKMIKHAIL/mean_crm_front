import {
      AfterViewInit,
      Component,
      ElementRef,
      Input,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import { fromEvent, Observable, of, Subject, takeUntil } from "rxjs";
import { PositionsService } from "../../../../../shared/services/positions/positions.service";
import { PositionInterface } from "../../../../../shared/interfaces/position.interface";
import {
      MaterialInterface,
      MaterialService,
} from "../../../../../shared/classes/material.service";
import {
      FormControl,
      FormGroup,
      Validators,
} from "@angular/forms";

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
      addPositionForm!: FormGroup;
      isAlive = new Subject<void>();
      @Input("categoryId") categoryIdProps: string | undefined;
      @ViewChild("addPosition", { static: true }) addPositionRef!: ElementRef;
      @ViewChild("modal") modalRef!: ElementRef;

      constructor(
            private positionsService: PositionsService,
            private materialService: MaterialService,
      ) {}

      ngOnInit(): void {
            this.initializePositions();
            this.initializeForm();

            fromEvent(this.addPositionRef.nativeElement, "click").subscribe(
                  () => {
                        this.modal?.open();
                  },
            );
      }

      initializePositions() {
            if (this.categoryIdProps) {
                  this.positions$ = this.positionsService.getAllPositions(
                        this.categoryIdProps,
                  );
            }
      }
      initializeForm() {
            this.addPositionForm = new FormGroup({
                  posName: new FormControl(null, [Validators.required]),
                  posCost: new FormControl(null, [Validators.required]),
            });
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
            this.isAlive.next();
            this.isAlive.complete();
      }

      selectPosition(position: PositionInterface) {
            console.log(position);
      }

      hideModal() {
            this.modal?.close();
      }

      submitPosition() {
            console.log("submitPosition");
            const name = this.addPositionForm.get("posName")?.value;
            const cost = this.addPositionForm.get("posCost")?.value;
            this.categoryIdProps &&
                  this.positionsService
                        .createPosition(name, cost, this.categoryIdProps)
                        .pipe(takeUntil(this.isAlive))
                        .subscribe(() => {
                              this.modal?.close();
                              this.initializePositions();
                        });
      }
}
