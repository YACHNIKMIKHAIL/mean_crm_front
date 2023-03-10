import { Injectable } from "@angular/core";
import {
      PositionWithQuantityInterface,
} from "../../../shared/interfaces/position.interface";

@Injectable()
export class OrderService {
      private list: PositionWithQuantityInterface[] = [];
      private calculatedPrice: number = 0;
      get price() {
            return this.calculatedPrice;
      }
      get positions() {
            return this.list;
      }

      constructor() {}

      add(position: PositionWithQuantityInterface) {
            const orderPosition = Object.assign(
                  {},
                  {
                        name: position.name,
                        cost: position.cost,
                        quantity: position.quantity,
                        _id: position._id,
                  },
            );
            const existingPosition = this.list.find(
                  p => p._id === orderPosition._id,
            );
            if (existingPosition) {
                  (existingPosition.quantity as number) +=
                        orderPosition.quantity as number;
            } else {
                  this.list.push(
                        orderPosition as PositionWithQuantityInterface,
                  );
            }

            this.calculatePrice();
      }

      remove(id: string) {
            const idx = this.list.findIndex(p => p._id === id);
            this.list.splice(idx, 1);
            this.calculatePrice();
      }

      clear() {
            this.list = [];
      }

      private calculatePrice() {
            this.calculatedPrice = this.list?.reduce((acc, el) => {
                  return acc + el.cost * (el.quantity as number);
            }, 0);
      }
}
