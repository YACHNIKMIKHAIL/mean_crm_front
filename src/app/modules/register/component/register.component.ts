import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
export class RegisterComponent implements OnInit, OnDestroy {
      registerSubscription!: Subscription;
      @ViewChild("crm-auth-form") crmAuthForm!: AuthFormComponent;
      constructor(private authService: AuthService, private router: Router) {}
      register($event: UserInterface) {
            this.crmAuthForm.authForm.disable();
            this.authService.register($event).subscribe(
                  () => {
                        this.router.navigate([RouterPathsEnum.OVERVIEW]);
                  },
                  (err: any) => {
                        this.crmAuthForm.authForm.enable();
                        console.log("register failed", err);
                  },
            );
      }

      ngOnDestroy(): void {
            if (this.registerSubscription) {
                  this.registerSubscription.unsubscribe();
            }
      }

      ngOnInit(): void {
            if (this.authService.isAuthenticated()) {
                  this.router.navigate([RouterPathsEnum.OVERVIEW]);
            }
      }
}
