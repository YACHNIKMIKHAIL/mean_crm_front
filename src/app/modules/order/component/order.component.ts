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
import { OrderService as AppOrdersService } from "../service/order.service";
import {
      OrderInterface,
      PositionWithQuantityInterface,
} from "../../../shared/interfaces/position.interface";
import { OrdersService as HttpOrdersService } from "../../../shared/services/orders/orders.service";

@Component({
      selector: "crm-order",
      templateUrl: "./order.component.html",
      styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit, OnDestroy, AfterViewInit {
      routesPaths = RouterPathsEnum;
      isRoot: boolean | undefined;
      pending = false;
      isAlive = new Subject<void>();
      listToOrder: PositionWithQuantityInterface[] | undefined;
      @ViewChild("modal") modalRef!: ElementRef;
      private modal!: MaterialInterface;
      constructor(
            private router: Router,
            private materialService: MaterialService,
            private appOrdersService: AppOrdersService,
            private httpOrdersService: HttpOrdersService,
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
            this.listToOrder = this.appOrdersService.list;
      }

      ngAfterViewInit(): void {
            this.modal = this.materialService.initModal(
                  this.modalRef.nativeElement,
            );
      }

      showModal() {
            this.modal.open();
      }

      closeModal() {
            this.modal.close();
      }

      submit() {
            this.pending = true;
            const newOrder: OrderInterface = {
                  list: this.appOrdersService.list.map(p => {
                        delete p._id;
                        return p;
                  }),
            };
            this.httpOrdersService
                  .createOrder(newOrder)
                  .pipe(takeUntil(this.isAlive))
                  .subscribe(
                        createdOrder => {
                              this.materialService.toast(
                                    `Order №${createdOrder.order} was created!`,
                              );
                              this.appOrdersService.clear();
                              this.listToOrder = this.appOrdersService.list;
                        },
                        err => this.materialService.toast(err.error.message),
                        () => {
                              this.modal.close();
                              this.pending = false;
                        },
                  );
      }

      allPrice(): number {
            return this.appOrdersService.price;
      }

      removePosFromOrder(_id: string) {
            this.appOrdersService.remove(_id);
      }

      trackById(index: number, item: PositionWithQuantityInterface) {
            return item._id;
      }
}
