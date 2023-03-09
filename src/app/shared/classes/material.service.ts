import { ElementRef, Injectable } from "@angular/core";
declare var M: any;

export interface MaterialInterface {
      open(): void;
      close(): void;
      destroy(): void;
}
@Injectable({
      providedIn: "root",
})
export class MaterialService {
      constructor() {}

      toast(message: string) {
            M.toast({ html: message });
      }

      initializeFloatingButton(elemRef: ElementRef) {
            M.FloatingActionButton.init(elemRef.nativeElement);
      }

      updateTextInput() {
            M.updateTextFields();
      }

      showModal(elem: ElementRef): MaterialInterface {
            return M.Modal.init(elem);
      }
}
