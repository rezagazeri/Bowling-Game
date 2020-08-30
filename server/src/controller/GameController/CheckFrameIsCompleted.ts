import RollFrame from "./RollFrame";
import {BonusType} from '../config/config';

export class CheckFrameIsCompleted {
    
    private _checkFrameIsCompleted:RollFrame;
    constructor(rollFrame){
        this._checkFrameIsCompleted = rollFrame;
    }
   public checkFrameCompleted(): boolean {
        return (this._checkFrameIsCompleted.bonus !== BonusType.nobonus || this._checkFrameIsCompleted.throws.length === 2) ? 
         true: false;
    }
   
   
}