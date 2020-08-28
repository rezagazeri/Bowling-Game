"use strict";
exports.__esModule = true;
exports.BonusType = exports.RollThrow = exports.totalFrame = exports.pinCount = exports.specialThrowCount = exports.defaultThrowCount = exports.frameCount = void 0;
exports.frameCount = 10;
exports.defaultThrowCount = 2;
exports.specialThrowCount = 3;
exports.pinCount = 10;
exports.totalFrame = 10;
var RollThrow;
(function (RollThrow) {
    RollThrow[RollThrow["defaultThrow"] = 2] = "defaultThrow";
    RollThrow[RollThrow["EndframThrow"] = 3] = "EndframThrow";
})(RollThrow = exports.RollThrow || (exports.RollThrow = {}));
;
var BonusType;
(function (BonusType) {
    BonusType["strick"] = "STRIKE";
    BonusType["spare"] = "SPARE";
    BonusType["nobonus"] = "NOBONUS";
})(BonusType = exports.BonusType || (exports.BonusType = {}));
;
