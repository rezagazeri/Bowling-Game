import { BonusType, totalFrame } from '../config/config';
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
    
    get relevantFrameScore():number{
        return this._relevantFrameScore;
    }
    get bonusScore():number{
        return this._bonusScore;
    }
    get nextFramen():RollFrame{
        return this._nextFrame;
    }
    private readonly maxThrows: number;
    private _nextFrame: any;
    private _throws: number[];
    private _bonus: BonusType;
    private _isComplete: boolean;
    private _relevantFrameScore:number;
    private _bonusScore:number;

    constructor(maxThrows) {
        this.maxThrows = maxThrows;
        this._nextFrame = null;
        this._throws = [];
        this._bonus = BonusType.nobonus;
        this._isComplete = false;
        this._relevantFrameScore = 0;
        this._bonusScore=0;
    }

    public update(count: number): this {
        this._throws.push(count);
        this._relevantFrameScore = new RelevantFrameScore(this).relevantFrameScore();
        this._bonus = new BounosRequired(this).checkBonus();
        this._isComplete = new CheckFrameIsCompleted(this).checkFrameCompleted();

        return this;
    }
  
    private bonusCalculator(bonusType:BonusType): number {
        return (this._nextFrame ? this._nextFrame.nextFrameScore(bonusType) : 0);
    }
    private nextFrameScore(bonusType:BonusType): number {
        if (bonusType === BonusType.strick) {
            if(this.bonus !==BonusType.strick) return this.relevantFrameScore;
            return this.bonusCalculator(BonusType.spare) + totalFrame;
        }
        return this.throws[0];
    }
  public serialize(): object {
        const bonusFrameScore = this.bonus !== BonusType.nobonus ?this.bonusCalculator(this.bonus):0;
        return {
            throws: this.throws,
            bonus:this.bonus,
            isComplete: this.isComplete,
            bonusScore:bonusFrameScore,
            relevantScore :this._relevantFrameScore,
            totalFrameScore :this._relevantFrameScore + bonusFrameScore
        }
    }

}

