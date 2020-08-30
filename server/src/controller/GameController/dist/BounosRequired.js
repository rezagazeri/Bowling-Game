"use strict";
exports.__esModule = true;
exports.BounosRequired = void 0;
var config_1 = require("../config/config");
var BounosRequired = /** @class */ (function () {
    function BounosRequired(rollFrame) {
        this._bounosRequired = rollFrame;
    }
    BounosRequired.prototype.checkBonus = function () {
        var type;
        if ((this._bounosRequired.throws.length === 1) && (this._bounosRequired.relevantFrameScore === config_1.totalFrame))
            type = config_1.BonusType.strick;
        else if ((this._bounosRequired.throws.length > 1) && (this._bounosRequired.relevantFrameScore === config_1.totalFrame))
            type = config_1.BonusType.spare;
        else
            type = config_1.BonusType.nobonus;
        return type;
    };
    return BounosRequired;
}());
exports.BounosRequired = BounosRequired;
