import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PositionInterface } from "../../../modules/categories/components/category-form/positions-form/positions-form.component";
import { environment } from "../../../../enviroments/environment";

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
}
