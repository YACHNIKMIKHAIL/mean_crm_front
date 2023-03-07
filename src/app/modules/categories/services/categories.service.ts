import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../enviroments/environment";
import { CategoryInterface } from "../../../shared/interfaces/category.interface";
import { Observable } from "rxjs";

@Injectable({
      providedIn: "root",
})
export class CategoriesService {
      constructor(private http: HttpClient) {}

      getAllCategories(): Observable<CategoryInterface[]> {
            return this.http.get<CategoryInterface[]>(
                  environment.urls.categories,
            );
      }
}
