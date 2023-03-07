import { ElementRef, Injectable } from "@angular/core";
declare var M: any;

@Injectable({
      providedIn: "root",
})
export class MaterialService {
      constructor() {}

      toast(message: string) {
            M.toast({ html: message });
      }

      initializeFloatingButton(elemRef: ElementRef) {
            console.log("initializeFloatingButton", elemRef.nativeElement);
            M.FloatingActionButton.init(elemRef.nativeElement);
      }
}
