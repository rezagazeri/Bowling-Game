import { pinCount,BonusType } from './config';
import {CheckFrameIsCompleted} from './CheckFrameIsCompleted';
import {BounosRequired} from './BounosRequired';
import { RelevantFrameScore } from './RelevantFrameScore';
export default class RollFrame {
    set nextFrame(value: this) {
        this._nextFrame = value;
    }

    get throws(): number[] {
        return this._throws;
    }

    get bonus(): BonusType {
        return this._bonus;
    }

    get isComplete(): boolean {
        return this._isComplete;
    }
    
    get completeFrameScore():number{
        return this._completeFrameScore;
    }
    private readonly maxThrows: number;
    private _nextFrame: any;
    private _throws: number[];
    private _bonus: BonusType;
    private _isComplete: boolean;
     private _completeFrameScore:number;

    constructor(maxThrows) {
        this.maxThrows = maxThrows;
        this._nextFrame = null;
        this._throws = [];
        this._bonus = BonusType.nobonus;
        this._isComplete = false;
        this._completeFrameScore = 0;
    }

    public update(count: number): this {
        this._throws.push(count);
        this._completeFrameScore = new RelevantFrameScore(this).relevantFrameScore();
        this._bonus = new BounosRequired(this).checkBonus();
        this._isComplete = new CheckFrameIsCompleted(this).checkFrameCompleted();

        return this;
    }
  
    public getScore(modifier: number): number {
        return (!modifier) ?
            this.getOwnScore() :
            this.getOwnScore() + (this._nextFrame ? this._nextFrame.getNextScore(modifier) : 0);
    }

    private getOwnScore(): number {
        return this.sumUpThrows();
    }

    private getNextScore(nextScores: number): number {
        if (nextScores > this._throws.length) {
            let ownScore = this.sumUpThrows();
            let nextScore = 0;
            if (this.bonus===BonusType.strick && this._nextFrame) nextScore = this._nextFrame.getNextScore(nextScores - 1);
            return ownScore + nextScore;
        }
        return this.sumUpThrows(nextScores);
    }

    public sumUpThrows(limit = 0): number {
        return this._throws.reduce((acc, value, index) => {
            return (limit > 0) ?
                acc + (index < limit ? value : 0) :
                acc + value;
        }, 0);
    }

    public serialize(): object {
        let modifier = 0;
        if (this.bonus===BonusType.spare) modifier = 1;
        if (this.bonus===BonusType.strick) modifier = 2;
        return {
            throws: this.throws,
            bonus:this.bonus,
            isComplete: this.isComplete,

            score: this.getScore(modifier)
        }
    }

}

