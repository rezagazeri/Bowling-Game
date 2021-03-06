
import { BonusType,totalFrame} from '../config/config';
import RollFrame from './RollFrame'

export class BounosRequired  {
    private _bounosRequired:RollFrame;
    constructor(rollFrame){
        this._bounosRequired = rollFrame;
    }
  public checkBonus(): BonusType {
     let type;
     if(  (this._bounosRequired.throws.length === 1) && (this._bounosRequired.relevantFrameScore === totalFrame))type =  BonusType.strick;
     else if(  (this._bounosRequired.throws.length > 1) && (this._bounosRequired.relevantFrameScore === totalFrame))type =  BonusType.spare;
     else type = BonusType.nobonus;
     return type;
   }

   
}