import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../enviroments/environment";
import { PositionInterface } from "../../interfaces/position.interface";
import { MessageInterface } from "../../interfaces/message.interface";

@Injectable({
      providedIn: "root",
})
export class PositionsService {
      constructor(private http: HttpClient) {}

      createPosition(body: PositionInterface): Observable<PositionInterface> {
            return this.http.post<PositionInterface>(
                  environment.urls.position,
                  body,
            );
      }

      getAllPositions(categoryId: string): Observable<PositionInterface[]> {
            return this.http.get<PositionInterface[]>(
                  `${environment.urls.position}/${categoryId}`,
            );
      }
      removePosition(id: string): Observable<MessageInterface> {
            return this.http.delete<MessageInterface>(
                  `${environment.urls.position}/${id}`,
            );
      }

      updatePosition(
            categoryId: string,
            name?: string,
            cost?: number,
      ): Observable<PositionInterface> {
            return this.http.patch<PositionInterface>(
                  `${environment.urls.position}/${categoryId}`,
                  { name, cost },
            );
      }
}
