import { Component, OnDestroy, ViewChild } from "@angular/core";
import { UserInterface } from "../../../shared/interfaces/auth.types";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { AuthFormComponent } from "../../../shared/auth-form/component/auth-form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";

@Component({
      selector: "crm-login",
      templateUrl: "./login.component.html",
      styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnDestroy {
      loginSubscription!: Subscription;
      @ViewChild("crm-auth-form") crmAuthForm!: AuthFormComponent;
      constructor(
            private authService: AuthService,
            private router: Router,
            private route: ActivatedRoute,
      ) {}
      login($event: UserInterface) {
            this.loginSubscription = this.authService.login($event).subscribe(
                  () => this.router.navigate([RouterPathsEnum.OVERVIEW]),
                  err => {
                        this.crmAuthForm.authForm.enable();
                        console.log("login failed", err);
                  },
            );
      }

      ngOnDestroy(): void {
            if (this.loginSubscription) {
                  this.loginSubscription.unsubscribe();
            }
      }
}
