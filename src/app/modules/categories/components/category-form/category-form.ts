import {
      Component,
      ElementRef,
      OnDestroy,
      OnInit,
      ViewChild,
} from "@angular/core";
import { RouterPathsEnum } from "../../../../shared/enums/routerPaths.enum";
import { Subscription } from "rxjs";
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
      isNew = true;
      categorySubscription = new Subscription();
      categoryForm!: FormGroup;
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
                        this.categorySubscription = this.categoriesService
                              .getCurrentCategory(params["id"])
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
            this.categorySubscription.unsubscribe();
      }

      private initializeForm() {
            this.categoryForm = new FormGroup({
                  name: new FormControl(null, [Validators.required]),
            });
      }

      submitForm() {}
}
