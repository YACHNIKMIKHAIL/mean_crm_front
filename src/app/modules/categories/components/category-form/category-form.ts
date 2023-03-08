import {
      Component,
      ElementRef,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import { RouterPathsEnum } from "../../../../shared/enums/routerPaths.enum";
import { Subject, takeUntil } from "rxjs";
import { CategoryInterface } from "../../../../shared/interfaces/category.interface";
import { CategoriesService } from "../../services/categories.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
      @ViewChild("inputEl") inputEl!: ElementRef;

      constructor(
            private categoriesService: CategoriesService,
            private route: ActivatedRoute,
      ) {}

      ngOnInit(): void {
            this.initializeForm();
            this.route.params.subscribe(params => {
                  if (params["id"]) {
                        this.isNew = false;
                        this.categoryId = params["id"];
                        this.categoriesService
                              .getCurrentCategory(params["id"])
                              .pipe(takeUntil(this.isAlive))
                              .subscribe(category => {
                                    this.categoryForm
                                          .get("name")
                                          ?.setValue(category.name);
                                    this.inputEl.nativeElement.focus();
                              });
                  }
            });
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
            console.log(this.categoryForm.get("name")?.value);
            if (this.isNew) {
                  this.categoriesService
                        .createCategory(this.categoryForm.get("name")?.value)
                        .pipe(takeUntil(this.isAlive))
                        .subscribe();
            } else if (!this.isNew && this.categoryId) {
                  this.categoriesService
                        .updateCategory(
                              this.categoryForm.get("name")?.value,
                              this.categoryId,
                        )
                        .pipe(takeUntil(this.isAlive))
                        .subscribe();
            }
      }
}
