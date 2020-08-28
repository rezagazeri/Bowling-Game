"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var CheckFrameIsCompleted_1 = require("./CheckFrameIsCompleted");
var Frame = /** @class */ (function () {
    // private _iscompleter:Complete;
    function Frame(maxThrows) {
        this.maxThrows = maxThrows;
        this._nextFrame = null;
        this._throws = [];
        this._isSpare = false;
        this._isStrike = false;
        this._isComplete = false;
    }
    Object.defineProperty(Frame.prototype, "nextFrame", {
        set: function (value) {
            this._nextFrame = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Frame.prototype, "throws", {
        get: function () {
            return this._throws;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Frame.prototype, "isSpare", {
        get: function () {
            return this._isSpare;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Frame.prototype, "isStrike", {
        get: function () {
            return this._isStrike;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Frame.prototype, "isComplete", {
        get: function () {
            return this._isComplete;
        },
        enumerable: false,
        configurable: true
    });
    Frame.prototype.update = function (count) {
        this._throws.push(count);
        this._isSpare = this.evaluateIfSpare();
        this._isStrike = this.evaluateIfStrike();
        this._isComplete = new CheckFrameIsCompleted_1.Complete(this).evaluateIfComplete();
        return this;
    };
    Frame.prototype.evaluateIfSpare = function () {
        return (this._throws.length > 1) && (this.sumUpThrows() === config_1.pinCount);
    };
    Frame.prototype.evaluateIfStrike = function () {
        return (this.throws.length === 1) && (this.sumUpThrows() === config_1.pinCount);
    };
    Frame.prototype.getScore = function (modifier) {
        return (!modifier) ?
            this.getOwnScore() :
            this.getOwnScore() + (this._nextFrame ? this._nextFrame.getNextScore(modifier) : 0);
    };
    Frame.prototype.getOwnScore = function () {
        return this.sumUpThrows();
    };
    Frame.prototype.getNextScore = function (nextScores) {
        if (nextScores > this._throws.length) {
            var ownScore = this.sumUpThrows();
            var nextScore = 0;
            if (this.isStrike && this._nextFrame)
                nextScore = this._nextFrame.getNextScore(nextScores - 1);
            return ownScore + nextScore;
        }
        return this.sumUpThrows(nextScores);
    };
    Frame.prototype.sumUpThrows = function (limit) {
        if (limit === void 0) { limit = 0; }
        return this._throws.reduce(function (acc, value, index) {
            return (limit > 0) ?
                acc + (index < limit ? value : 0) :
                acc + value;
        }, 0);
    };
    Frame.prototype.serialize = function () {
        var modifier = 0;
        if (this.isSpare)
            modifier = 1;
        if (this.isStrike)
            modifier = 2;
        return {
            throws: this.throws,
            isSpare: this.isSpare,
            isStrike: this.isStrike,
            isComplete: this.isComplete,
            score: this.getScore(modifier)
        };
    };
    return Frame;
}());
exports["default"] = Frame;
