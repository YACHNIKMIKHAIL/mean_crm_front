import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UserInterface } from "../../../shared/interfaces/auth.types";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { AuthFormComponent } from "../../../shared/auth-form/component/auth-form.component";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";

@Component({
      selector: "crm-login",
      templateUrl: "./login.component.html",
      styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
      loginSubscription!: Subscription;
      routeSubscription!: Subscription;
      @ViewChild("crm-auth-form") crmAuthForm!: AuthFormComponent;
      constructor(
            private authService: AuthService,
            private router: Router,
            private route: ActivatedRoute,
      ) {}
      login($event: UserInterface) {
            this.loginSubscription = this.authService.login($event).subscribe(
                  () => {
                        this.router.navigate([RouterPathsEnum.OVERVIEW]);
                  },
                  (err: any) => {
                        this.crmAuthForm.authForm.enable();
                        console.warn("login failed", err);
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
                              console.log(
                                    "queryParams => you can log in with your own credentials",
                              );
                        } else if (params["accessDenied"]) {
                              console.log(
                                    "queryParams => to get started, log in to the system",
                              );
                        }
                  },
            );
      }
}
