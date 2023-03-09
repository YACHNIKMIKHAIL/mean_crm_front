import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../enviroments/environment";
import { PositionInterface } from "../../interfaces/position.interface";

@Injectable({
      providedIn: "root",
})
export class PositionsService {
      constructor(private http: HttpClient) {}

      getAllPositions(categoryId: string): Observable<PositionInterface[]> {
            return this.http.get<PositionInterface[]>(
                  `${environment.urls.position}/${categoryId}`,
            );
      }

      createPosition(
            name: string,
            cost: number,
            categoryId: string,
      ): Observable<PositionInterface[]> {
            //name, cost, category
            const body = { name, cost, category: categoryId };
            return this.http.post<PositionInterface[]>(
                  environment.urls.position,
                  body,
            );
      }
}
