import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UserInterface } from "../../../shared/interfaces/auth.interface";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { AuthFormComponent } from "../../../shared/components/auth-form/component/auth-form.component";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";
import { MaterialService } from "../../../shared/classes/material.service";

@Component({
      selector: "crm-current-category",
      templateUrl: "./login.component.html",
      styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
      loginSubscription!: Subscription;
      routeSubscription!: Subscription;
      @ViewChild("form") crmAuthForm!: AuthFormComponent;
      constructor(
            private authService: AuthService,
            private router: Router,
            private route: ActivatedRoute,
            private materialService: MaterialService,
      ) {}
      login($event: UserInterface) {
            this.loginSubscription = this.authService.login($event).subscribe(
                  () => {
                        this.router.navigate([RouterPathsEnum.OVERVIEW]);
                  },
                  (err: any) => {
                        this.materialService.toast(err.error.message);
                        this.crmAuthForm.authForm.enable();
                  },
            );
      }

      ngOnDestroy(): void {
            if (this.loginSubscription) {
                  this.loginSubscription.unsubscribe();
            }
            this.routeSubscription.unsubscribe();
      }

      ngOnInit(): void {
            this.routeSubscription = this.route.queryParams.subscribe(
                  (params: Params) => {
                        if (params["registered"]) {
                              this.materialService.toast(
                                    "You can log in with your own credentials.",
                              );
                        } else if (params["accessDenied"]) {
                              this.materialService.toast(
                                    "To get started, log in to the system.",
                              );
                        } else if (params["sessionFailed"]) {
                              this.materialService.toast(
                                    "Your session has ended, please current-category again.",
                              );
                        }
                  },
            );
      }
}
