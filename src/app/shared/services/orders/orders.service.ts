import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../enviroments/environment";
import { OrderInterface } from "../../interfaces/position.interface";
import { Observable } from "rxjs";

@Injectable({
      providedIn: "root",
})
export class OrdersService {
      constructor(private http: HttpClient) {}

      createOrder(newOrder: OrderInterface): Observable<OrderInterface> {
            return this.http.post<OrderInterface>(
                  environment.urls.order,
                  newOrder,
            );
      }
}
