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

      getCurrentCategory(id: string): Observable<CategoryInterface> {
            return this.http.get<CategoryInterface>(
                  `${environment.urls.categories}/${id}`,
            );
      }

      createCategory(name: string): Observable<CategoryInterface> {
            return this.http.post<CategoryInterface>(
                  environment.urls.categories,
                  { name },
            );
      }
      updateCategory(name: string, id: string): Observable<CategoryInterface> {
            return this.http.patch<CategoryInterface>(
                  `${environment.urls.categories}/${id}`,
                  { name },
            );
      }
}
