"use strict";
exports.__esModule = true;
var config_1 = require("../config/config");
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
        this._relevantFrameScore = 0;
        this._bonusScore = 0;
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
    Object.defineProperty(RollFrame.prototype, "relevantFrameScore", {
        get: function () {
            return this._relevantFrameScore;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollFrame.prototype, "bonusScore", {
        get: function () {
            return this._bonusScore;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RollFrame.prototype, "nextFramen", {
        get: function () {
            return this._nextFrame;
        },
        enumerable: false,
        configurable: true
    });
    RollFrame.prototype.update = function (count) {
        this._throws.push(count);
        this._relevantFrameScore = new RelevantFrameScore_1.RelevantFrameScore(this).relevantFrameScore();
        this._bonus = new BounosRequired_1.BounosRequired(this).checkBonus();
        this._isComplete = new CheckFrameIsCompleted_1.CheckFrameIsCompleted(this).checkFrameCompleted();
        return this;
    };
    RollFrame.prototype.bonusCalculator = function (bonusType) {
        return (this._nextFrame ? this._nextFrame.nextFrameScore(bonusType) : 0);
    };
    RollFrame.prototype.nextFrameScore = function (bonusType) {
        if (bonusType === config_1.BonusType.strick) {
            if (this.bonus !== config_1.BonusType.strick)
                return this.relevantFrameScore;
            return this.bonusCalculator(config_1.BonusType.spare) + config_1.totalFrame;
        }
        return this.throws[0];
    };
    RollFrame.prototype.serialize = function () {
        var bonusFrameScore = this.bonus !== config_1.BonusType.nobonus ? this.bonusCalculator(this.bonus) : 0;
        return {
            throws: this.throws,
            bonus: this.bonus,
            isComplete: this.isComplete,
            bonusScore: bonusFrameScore,
            relevantScore: this._relevantFrameScore,
            totalFrameScore: this._relevantFrameScore + bonusFrameScore
        };
    };
    return RollFrame;
}());
exports["default"] = RollFrame;
