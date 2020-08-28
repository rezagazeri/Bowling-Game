"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var inquirer_1 = require("inquirer");
var config_1 = require("./config");
var Game_1 = require("./Game");
var PrintService_1 = require("./PrintService");
var App = /** @class */ (function () {
    function App() {
        this.Game = new Game_1["default"]();
        this.PrintService = new PrintService_1["default"](config_1.frameCount);
        this.baseQuestion = {
            type: 'list',
            name: 'score',
            message: 'How many pins did you get?',
            choices: []
        };
    }
    App.prototype.start = function () {
        var _this = this;
        var currentScore = this.Game.getLastFrame().sumUpThrows();
        var question = __assign(__assign({}, this.baseQuestion), { choices: App.calculateChoices(currentScore) });
        inquirer_1["default"]
            .prompt([question])
            .then(function (_a) {
            var score = _a.score;
            _this.Game.applyScore(parseInt(score, 10));
        })
            .then(function () {
            return (_this.Game.isComplete) ?
                Promise.reject() :
                Promise.resolve();
        })
            .then(function () {
            _this.start();
        })["catch"](function () {
            _this.PrintService.print(_this.Game.serializeFrames());
        });
    };
    App.calculateChoices = function (lastCount) {
        var maxCount = config_1.pinCount - lastCount;
        return __spreadArrays(Array(maxCount + 1).keys()).map(function (v) { return v + ''; });
    };
    return App;
}());
exports["default"] = App;
