"use strict";
exports.__esModule = true;
exports.Complete = void 0;
var Complete = /** @class */ (function () {
    function Complete(frame) {
        this.v = frame;
    }
    Complete.prototype.evaluateIfComplete = function () {
        return this.v.isSpare
            || this.v.isStrike
            || (this.v.throws.length === 2);
    };
    return Complete;
}());
exports.Complete = Complete;
