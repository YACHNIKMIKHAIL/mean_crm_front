import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../enviroments/environment";
import { AnalyticsOverviewResponseInterfaces } from "./analytics.interfaces";
import { Observable } from "rxjs";

@Injectable({
      providedIn: "root",
})
export class AnalyticsService {
      constructor(private http: HttpClient) {}

      getOverview(): Observable<AnalyticsOverviewResponseInterfaces> {
            return this.http.get<AnalyticsOverviewResponseInterfaces>(
                  `${environment.urls.analytics}/overview`,
            );
      }
}
