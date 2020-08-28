"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var RollFrame_1 = require("./RollFrame");
var config_1 = require("./config");
var GameStatus_1 = require("./GameStatus");
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this._totalFrames = [new RollFrame_1["default"](2)];
        _this._isComplete = false;
        return _this;
    }
    Object.defineProperty(Game.prototype, "isComplete", {
        get: function () {
            return this._isComplete;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.getLastFrame = function () {
        return this._totalFrames[this._totalFrames.length - 1];
    };
    Game.prototype.applyScore = function (score) {
        var currentFrame = this.getLastFrame();
        this._totalFrames[this._totalFrames.length - 1].update(score);
        if (currentFrame.isComplete && this._totalFrames.length === config_1.frameCount) {
            this._isComplete = true;
            return;
        }
        if (currentFrame.isComplete) {
            this.addFrame();
        }
    };
    Game.prototype.serializeFrames = function () {
        return this._totalFrames.map(function (frame) { return frame.serialize(); });
    };
    Game.prototype.createFrame = function () {
        var maxThrows = (this._totalFrames && this._totalFrames.length === (config_1.frameCount - 1)) ?
            config_1.specialThrowCount :
            config_1.defaultThrowCount;
        return new RollFrame_1["default"](maxThrows);
    };
    Game.prototype.addFrame = function () {
        var newFrame = this.createFrame();
        var lastFrame = this._totalFrames[this._totalFrames.length - 1];
        lastFrame.nextFrame = newFrame;
        this._totalFrames = __spreadArrays(this._totalFrames, [newFrame]);
    };
    return Game;
}(GameStatus_1.GameStatus));
exports["default"] = Game;
