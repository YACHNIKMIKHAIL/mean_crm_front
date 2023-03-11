import { Injectable } from "@angular/core";
import { PositionWithQuantityInterface } from "../../../shared/interfaces/position.interface";

@Injectable()
export class OrderService {
      private listOfPositions: PositionWithQuantityInterface[] = [];
      private calculatedPrice: number = 0;
      get price() {
            return this.calculatedPrice;
      }
      get list() {
            return this.listOfPositions;
      }

      set list(p: any[]) {
            this.listOfPositions = p;
      }
      set price(p: number) {
            this.calculatedPrice = p;
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
            this.price = 0;
      }

      private calculatePrice() {
            this.calculatedPrice = this.list?.reduce((acc, el) => {
                  return acc + el.cost * (el.quantity as number);
            }, 0);
      }
}
