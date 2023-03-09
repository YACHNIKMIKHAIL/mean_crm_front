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

      createCategory(
            name: string,
            image?: File,
      ): Observable<CategoryInterface> {
            const formData = new FormData();
            formData.append("name", name);
            if (image) {
                  formData.append("image", image, image.name);
            }
            return this.http.post<CategoryInterface>(
                  environment.urls.categories,
                  formData,
            );
      }
      updateCategory(
            name: string,
            id: string,
            image?: File,
      ): Observable<CategoryInterface> {
            const formData = new FormData();
            formData.append("name", name);
            if (image) {
                  formData.append("image", image, image.name);
            }

            return this.http.patch<CategoryInterface>(
                  `${environment.urls.categories}/${id}`,
                  formData,
            );
      }

      removeCategory(id: string): Observable<{ message: string }> {
            return this.http.delete<{ message: string }>(
                  `${environment.urls.categories}/${id}`,
            );
      }
}
