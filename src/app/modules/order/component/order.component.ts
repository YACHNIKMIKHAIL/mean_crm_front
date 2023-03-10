import {
      AfterViewInit,
      Component,
      ElementRef,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";
import { NavigationEnd, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import {
      MaterialInterface,
      MaterialService,
} from "../../../shared/classes/material.service";
import { OrderService } from "../service/order.service";
import { PositionWithQuantityInterface } from "../../../shared/interfaces/position.interface";

@Component({
      selector: "crm-order",
      templateUrl: "./order.component.html",
      styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit, OnDestroy, AfterViewInit {
      routesPaths = RouterPathsEnum;
      isRoot: boolean | undefined;
      isAlive = new Subject<void>();
      listToOrder: PositionWithQuantityInterface[] | undefined;
      @ViewChild("modal") modalRef!: ElementRef;
      private modal!: MaterialInterface;
      constructor(
            private router: Router,
            private materialService: MaterialService,
            private orderService: OrderService,
      ) {}

      ngOnDestroy(): void {
            this.isAlive.next();
            this.isAlive.complete();
      }

      ngOnInit(): void {
            this.router.events
                  .pipe(takeUntil(this.isAlive))
                  .subscribe(event => {
                        if (event instanceof NavigationEnd)
                              this.isRoot =
                                    this.router.url ===
                                    `/${this.routesPaths.ORDER}`;
                  });
      }

      ngAfterViewInit(): void {
            this.modal = this.materialService.initModal(
                  this.modalRef.nativeElement,
            );
      }

      showModal() {
            this.listToOrder = this.orderService.positions;
            this.modal.open();
      }

      closeModal() {
            this.modal.close();
      }

      submit() {
            console.log("submit order");
      }

      allPrice(): number {
            return this.orderService.price;
      }

      removePosFromOrder(_id: string) {
            this.orderService.remove(_id);
      }

      trackById(index: number, item: PositionWithQuantityInterface) {
            return item._id;
      }
}
