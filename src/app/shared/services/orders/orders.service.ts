import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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

      getAllOrders(params: {
            offset: number;
            limit: number;
      }): Observable<OrderInterface[]> {
            return this.http.get<OrderInterface[]>(environment.urls.order, {
                  params: new HttpParams({ fromObject: params }),
            });
      }
}
