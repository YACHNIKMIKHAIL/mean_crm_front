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
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
      isUpdateMode = false;
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
                  name: new FormControl(null, [Validators.required]),
                  cost: new FormControl(null, [
                        Validators.required,
                        Validators.min(1),
                  ]),
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
            this.addPositionForm.patchValue({
                  name: position.name,
                  cost: position.cost,
            });
            this.materialService.updateTextInput();
            this.modal?.open();
            this.isUpdateMode = true;
      }

      hideModal() {
            this.modal?.close();
      }

      submitPosition() {
            const name = this.addPositionForm.get("name")?.value;
            const cost = this.addPositionForm.get("cost")?.value;
            let stream$ = of({} as PositionInterface);
            if (this.categoryIdProps && this.isUpdateMode) {
                  stream$ = this.positionsService
                        .updatePosition(this.categoryIdProps, name, cost)
                        .pipe(takeUntil(this.isAlive));
            } else if (this.categoryIdProps) {
                  stream$ = this.positionsService
                        .createPosition(this.categoryIdProps, name, cost)
                        .pipe(takeUntil(this.isAlive));
            }

            stream$.subscribe(
                  position => {
                        this.modal?.close();
                        this.initializePositions();
                        this.addPositionForm.reset();
                        this.materialService.toast(
                              this.isUpdateMode
                                    ? `Position ${position.name} was updated`
                                    : `Position ${position.name} was created`,
                        );
                        this.isUpdateMode = false;
                  },
                  err => this.materialService.toast(err.error.message),
            );
      }

      removePosition(_id: string) {
            this.positionsService
                  .removePosition(_id)
                  .pipe(takeUntil(this.isAlive))
                  .subscribe(
                        ({ message }) => {
                              this.materialService.toast(message);
                              this.initializePositions();
                        },
                        err => this.materialService.toast(err.error.message),
                  );
      }
}
