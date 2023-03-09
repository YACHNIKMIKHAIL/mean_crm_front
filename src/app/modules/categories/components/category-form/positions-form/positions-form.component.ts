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
      positionId: string | null = null;
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
                        this.positionId = null;
                        this.modal?.open();
                        this.addPositionForm.reset({
                              name: null,
                              cost: null,
                        });
                        this.materialService.updateTextInput();
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
            this.positionId = position._id as string;
            this.addPositionForm.patchValue({
                  name: position.name,
                  cost: position.cost,
            });
            this.modal?.open();
            this.materialService.updateTextInput();
      }

      hideModal() {
            this.modal?.close();
      }

      submitPosition() {
            this.addPositionForm.disable();
            const { name, cost } = this.addPositionForm.value;
            let stream$ = of({} as PositionInterface);
            if (this.categoryIdProps && this.positionId) {
                  stream$ = this.positionsService
                        .updatePosition(this.categoryIdProps, name, cost)
                        .pipe(takeUntil(this.isAlive));
            } else if (this.categoryIdProps) {
                  const body = { name, cost, category: this.categoryIdProps };
                  stream$ = this.positionsService
                        .createPosition(body)
                        .pipe(takeUntil(this.isAlive));
            }

            stream$.subscribe(
                  position => {
                        this.initializePositions();

                        this.materialService.toast(
                              this.positionId
                                    ? `Position ${position.name} was updated`
                                    : `Position ${position.name} was created`,
                        );
                  },
                  err => {
                        this.materialService.toast(err.error.message);
                  },
                  () => {
                        this.modal?.close();
                        this.addPositionForm.enable();
                        this.addPositionForm.reset({
                              name: null,
                              cost: null,
                        });
                        this.materialService.updateTextInput();
                  },
            );
      }

      removePosition(_id: string, event: Event) {
            event.stopPropagation();
            const decision = window.confirm("Do you really want to remove it?");
            if (decision) {
                  this.positionsService
                        .removePosition(_id)
                        .pipe(takeUntil(this.isAlive))
                        .subscribe(
                              ({ message }) => {
                                    this.materialService.toast(message);
                                    this.initializePositions();
                              },
                              err =>
                                    this.materialService.toast(
                                          err.error.message,
                                    ),
                        );
            }
      }
}
