"use strict";
exports.__esModule = true;
exports.CheckFrameIsCompleted = void 0;
var config_1 = require("./config");
var CheckFrameIsCompleted = /** @class */ (function () {
    function CheckFrameIsCompleted(rollFrame) {
        this._checkFrameIsCompleted = rollFrame;
    }
    CheckFrameIsCompleted.prototype.checkFrameCompleted = function () {
        return (this._checkFrameIsCompleted.bonus !== config_1.BonusType.nobonus || this._checkFrameIsCompleted.throws.length === 2) ?
            true : false;
    };
    return CheckFrameIsCompleted;
}());
exports.CheckFrameIsCompleted = CheckFrameIsCompleted;
