"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var error_interceptor_1 = require("./error.interceptor");
describe('ErrorInterceptor', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({
        providers: [
            error_interceptor_1.ErrorInterceptor
        ]
    }); });
    it('should be created', function () {
        var interceptor = testing_1.TestBed.inject(error_interceptor_1.ErrorInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
//# sourceMappingURL=error.interceptor.spec.js.map