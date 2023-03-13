import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../enviroments/environment";
import { OverviewInterfaces } from "../../interfaces/analytics.interfaces";
import { Observable } from "rxjs";

@Injectable({
      providedIn: "root",
})
export class AnalyticsService {
      constructor(private http: HttpClient) {}

      getOverview(): Observable<OverviewInterfaces> {
            return this.http.get<OverviewInterfaces>(
                  `${environment.urls.analytics}/overview`,
            );
      }
}
