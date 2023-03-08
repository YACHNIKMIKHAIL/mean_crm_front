import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterPathsEnum } from "../../../../shared/enums/routerPaths.enum";
import { of, Subject, switchMap, takeUntil } from "rxjs";
import { CategoryInterface } from "../../../../shared/interfaces/category.interface";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MaterialService } from "../../../../shared/classes/material.service";

@Component({
      selector: "crm-category-form",
      templateUrl: "./category-form.html",
      styleUrls: ["./category-form.css"],
})
export class CategoryForm implements OnInit, OnDestroy {
      category?: CategoryInterface;
      categoryId?: string;
      isNew = true;
      categoryForm!: FormGroup;
      isAlive = new Subject<void>();
      routerPathsEnum = RouterPathsEnum;

      constructor(
            private categoriesService: CategoriesService,
            private materialService: MaterialService,
            private route: ActivatedRoute,
            private router: Router,
      ) {}

      ngOnInit(): void {
            this.initializeForm();
            this.route.params
                  .pipe(
                        switchMap(params => {
                              if (params["id"]) {
                                    this.isNew = false;
                                    this.categoryId = params["id"];
                                    return this.createNewCategory(params["id"]);
                              }
                              return of(null);
                        }),
                        takeUntil(this.isAlive),
                  )
                  .subscribe(
                        category => {
                              if (category) {
                                    this.categoryForm.patchValue({
                                          name: category.name,
                                    });
                                    this.materialService.updateTextInput();
                              }
                        },
                        error =>
                              this.materialService.toast(error.error.message),
                  );
      }
      createNewCategory(id: string) {
            return this.categoriesService
                  .getCurrentCategory(id)
                  .pipe(takeUntil(this.isAlive));
      }

      ngOnDestroy(): void {
            this.isAlive.next();
            this.isAlive.complete();
      }

      private initializeForm() {
            this.categoryForm = new FormGroup({
                  name: new FormControl(null, [
                        Validators.required,
                        Validators.minLength(5),
                  ]),
            });
      }

      submitForm() {
            const categoryName = this.categoryForm.get("name")?.value;
            if (this.isNew) {
                  this.categoriesService
                        .createCategory(categoryName)
                        .pipe(takeUntil(this.isAlive))
                        .subscribe(newCat => {
                              this.initializeForm();
                              this.materialService.toast(
                                    "Category was created.",
                              );
                              this.router.navigate([
                                    this.routerPathsEnum.CATEGORIES,
                                    newCat._id,
                              ]);
                        });
            } else if (!this.isNew && this.categoryId) {
                  this.categoriesService
                        .updateCategory(categoryName, this.categoryId)
                        .pipe(takeUntil(this.isAlive))
                        .subscribe(() => {
                              this.materialService.toast(
                                    "Category was updated.",
                              );
                        });
            }
      }

      removeCategory() {
            this.categoryId &&
                  this.categoriesService
                        .removeCategory(this.categoryId)
                        .pipe(takeUntil(this.isAlive))
                        .subscribe(({ message }) => {
                              this.materialService.toast(message);
                              this.router.navigate([
                                    this.routerPathsEnum.CATEGORIES,
                              ]);
                        });
      }
}
