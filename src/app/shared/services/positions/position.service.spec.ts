import { TestBed } from "@angular/core/testing";

import { PositionsService } from "./positions.service";

describe("PositionService", () => {
      let service: PositionsService;

      beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.inject(PositionsService);
      });

      it("should be created", () => {
            expect(service).toBeTruthy();
      });
});
