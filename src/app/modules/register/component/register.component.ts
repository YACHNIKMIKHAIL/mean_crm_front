import { Component, OnDestroy, ViewChild } from "@angular/core";
import { UserInterface } from "../../../shared/interfaces/auth.types";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { Subscription } from "rxjs";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";
import { AuthFormComponent } from "../../../shared/auth-form/component/auth-form.component";
import { Router } from "@angular/router";

@Component({
      selector: "app-register",
      templateUrl: "./register.component.html",
      styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnDestroy {
      registerSubscription!: Subscription;
      @ViewChild("crm-auth-form") crmAuthForm!: AuthFormComponent;
      constructor(private authService: AuthService, private router: Router) {}
      register($event: UserInterface) {
            this.crmAuthForm.authForm.disable();
            this.registerSubscription = this.authService
                  .register($event)
                  .subscribe(
                        () => {
                              this.router.navigate([RouterPathsEnum.LOGIN], {
                                    queryParams: { registered: true },
                              });
                        },
                        (err: any) => {
                              this.crmAuthForm.authForm.enable();
                              console.warn("register failed", err);
                        },
                  );
      }

      ngOnDestroy(): void {
            if (this.registerSubscription) {
                  this.registerSubscription.unsubscribe();
            }
      }
}
