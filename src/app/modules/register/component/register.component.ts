import { Component, OnDestroy, ViewChild } from "@angular/core";
import { UserInterface } from "../../../shared/interfaces/auth.types";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { Subscription } from "rxjs";
import { RouterPathsEnum } from "../../../shared/enums/routerPaths.enum";
import { AuthFormComponent } from "../../../shared/auth-form/component/auth-form.component";
import { Router } from "@angular/router";
import {MaterialService} from "../../../shared/classes/material.service";

@Component({
      selector: "app-register",
      templateUrl: "./register.component.html",
      styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnDestroy {
      registerSubscription!: Subscription;
      @ViewChild("form") crmAuthForm!: AuthFormComponent;
      constructor(private authService: AuthService, private router: Router,private materialService: MaterialService,) {}
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
                          this.materialService.toast(err.error.message);
                        },
                  );
      }

      ngOnDestroy(): void {
            if (this.registerSubscription) {
                  this.registerSubscription.unsubscribe();
            }
      }
}
