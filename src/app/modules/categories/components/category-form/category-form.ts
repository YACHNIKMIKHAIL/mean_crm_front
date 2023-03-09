import {
      Component,
      ElementRef,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import { RouterPathsEnum } from "../../../../shared/enums/routerPaths.enum";
import { fromEvent, of, Subject, switchMap, takeUntil } from "rxjs";
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
      image: File | undefined;
      imagePreview: string | ArrayBuffer | null = "";
      routerPathsEnum = RouterPathsEnum;
      @ViewChild("fileInput") fileInput!: ElementRef;
      @ViewChild("delButton", { static: true }) delButton!: ElementRef;

      constructor(
            private categoriesService: CategoriesService,
            private materialService: MaterialService,
            private route: ActivatedRoute,
            private router: Router,
      ) {}

      ngOnInit(): void {
            this.initializeForm();
            this.initializeDeleteStream();
            this.initializeRouterParams();
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

      private initializeDeleteStream() {
            fromEvent(this.delButton.nativeElement, "click")
                  .pipe(takeUntil(this.isAlive))
                  .subscribe(() => this.removeCategory());
      }

      private initializeRouterParams() {
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
                                    this.category = category;
                                    this.categoryForm.patchValue({
                                          name: category.name,
                                    });
                                    this.materialService.updateTextInput();
                                    this.imagePreview = category.imageSrc || "";
                              }
                        },
                        error =>
                              this.materialService.toast(error.error.message),
                  );
      }

      submitForm() {
            this.categoryForm.disable();
            const categoryName = this.categoryForm.get("name")?.value;

            let stream = of({} as CategoryInterface);
            if (this.isNew) {
                  stream = this.categoriesService
                        .createCategory(categoryName, this.image)
                        .pipe(takeUntil(this.isAlive));
            } else if (!this.isNew && this.categoryId) {
                  stream = this.categoriesService
                        .updateCategory(
                              categoryName,
                              this.categoryId,
                              this.image,
                        )
                        .pipe(takeUntil(this.isAlive));
            }
            stream.subscribe(
                  newCat => {
                        if (this.isNew) {
                              this.router.navigate([
                                    this.routerPathsEnum.CATEGORIES,
                                    newCat._id,
                              ]);
                        }
                        this.materialService.toast(
                              this.isNew
                                    ? "Category was created."
                                    : "Category was updated.",
                        );
                  },
                  error => {
                        this.categoryForm.enable();
                        this.materialService.toast(error.error.message);
                  },
            );
      }

      removeCategory() {
            console.log(this.category);
            const decision = window.confirm(
                  `Фre you sure you want to delete the category ${this.category?.name}?`,
            );
            if (decision) {
                  this.categoryId &&
                        this.categoriesService
                              .removeCategory(this.categoryId)
                              .pipe(takeUntil(this.isAlive))
                              .subscribe(
                                    ({ message }) => {
                                          this.materialService.toast(message);
                                    },
                                    error =>
                                          this.materialService.toast(
                                                error.error.message,
                                          ),
                                    () =>
                                          this.router.navigate([
                                                this.routerPathsEnum.CATEGORIES,
                                          ]),
                              );
            }
      }

      showFileInput() {
            this.fileInput.nativeElement.click();
      }

      onFileUpload(event: any) {
            const file = event.target.files[0];
            this.image = file;

            const reader = new FileReader();

            reader.onload = () => {
                  this.imagePreview = reader.result;
            };

            reader.readAsDataURL(file);
      }
}
