import { Injectable } from "@angular/core";
import { PositionWithQuantityInterface } from "../../../shared/interfaces/position.interface";

@Injectable()
export class OrderService {
      private positionsToOrder: PositionWithQuantityInterface[] = [];
      get positions() {
            return this.positionsToOrder;
      }
      constructor() {}

      add(position: PositionWithQuantityInterface) {
            this.positionsToOrder.push(position);
      }

      remove(id: string) {
            const idx = this.positionsToOrder.findIndex(p => p._id === id);
            this.positionsToOrder.splice(idx, 1);
      }

      clear() {
        this.positionsToOrder=[]
      }
}
