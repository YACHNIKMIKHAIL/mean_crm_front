import { TestBed } from "@angular/core/testing";

import { SavingToLocalStorageService } from "./saving-to-local-storage.service";

describe("SavingToLocalStorageService", () => {
      let service: SavingToLocalStorageService;

      beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.inject(SavingToLocalStorageService);
      });

      it("should be created", () => {
            expect(service).toBeTruthy();
      });
});
