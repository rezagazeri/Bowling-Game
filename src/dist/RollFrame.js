"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var CheckFrameIsCompleted_1 = require("./CheckFrameIsCompleted");
var BounosRequired_1 = require("./BounosRequired");
var RelevantFrameScore_1 = require("./RelevantFrameScore");
var RollFrame = /** @class */ (function () {
    function RollFrame(maxThrows) {
        this.maxThrows = maxThrows;
        this._nextFrame = null;
        this._throws = [];
        this._bonus = config_1.BonusType.nobonus;
        this._isComplete = false;
        this._completeFrameScore = 0;
    }
    Object.defineProperty(RollFrame.prototype, "nextFrame", {
        set: function (value) {
            this._nextFrame = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollFrame.prototype, "throws", {
        get: function () {
            return this._throws;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollFrame.prototype, "bonus", {
        get: function () {
            return this._bonus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollFrame.prototype, "isComplete", {
        get: function () {
            return this._isComplete;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollFrame.prototype, "completeFrameScore", {
        get: function () {
            return this._completeFrameScore;
        },
        enumerable: false,
        configurable: true
    });
    RollFrame.prototype.update = function (count) {
        this._throws.push(count);
        this._completeFrameScore = new RelevantFrameScore_1.RelevantFrameScore(this).relevantFrameScore();
        this._bonus = new BounosRequired_1.BounosRequired(this).checkBonus();
        this._isComplete = new CheckFrameIsCompleted_1.CheckFrameIsCompleted(this).checkFrameCompleted();
        return this;
    };
    RollFrame.prototype.getScore = function (modifier) {
        return (!modifier) ?
            this.getOwnScore() :
            this.getOwnScore() + (this._nextFrame ? this._nextFrame.getNextScore(modifier) : 0);
    };
    RollFrame.prototype.getOwnScore = function () {
        return this.sumUpThrows();
    };
    RollFrame.prototype.getNextScore = function (nextScores) {
        if (nextScores > this._throws.length) {
            var ownScore = this.sumUpThrows();
            var nextScore = 0;
            if (this.bonus === config_1.BonusType.strick && this._nextFrame)
                nextScore = this._nextFrame.getNextScore(nextScores - 1);
            return ownScore + nextScore;
        }
        return this.sumUpThrows(nextScores);
    };
    RollFrame.prototype.sumUpThrows = function (limit) {
        if (limit === void 0) { limit = 0; }
        return this._throws.reduce(function (acc, value, index) {
            return (limit > 0) ?
                acc + (index < limit ? value : 0) :
                acc + value;
        }, 0);
    };
    RollFrame.prototype.serialize = function () {
        var modifier = 0;
        if (this.bonus === config_1.BonusType.spare)
            modifier = 1;
        if (this.bonus === config_1.BonusType.strick)
            modifier = 2;
        return {
            throws: this.throws,
            bonus: this.bonus,
            isComplete: this.isComplete,
            score: this.getScore(modifier)
        };
    };
    return RollFrame;
}());
exports["default"] = RollFrame;
