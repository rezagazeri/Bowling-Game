"use strict";
exports.__esModule = true;
exports.RelevantFrameScore = void 0;
var RelevantFrameScore = /** @class */ (function () {
    function RelevantFrameScore(rollFrame) {
        this._relevantFrameScore = rollFrame;
    }
    RelevantFrameScore.prototype.relevantFrameScore = function () {
        return this._relevantFrameScore.throws.reduce(function (total, val) {
            return total + val;
        }, 0);
    };
    return RelevantFrameScore;
}());
exports.RelevantFrameScore = RelevantFrameScore;
