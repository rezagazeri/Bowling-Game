import RollFrame from "./RollFrame";

export class RelevantFrameScore {
    private _relevantFrameScore:RollFrame;
    constructor(rollFrame){
        this._relevantFrameScore = rollFrame;
    }
   public relevantFrameScore(): number {
       return this._relevantFrameScore.throws.reduce((total,val)=>{
           return total + val;
       },0);
        
    }
   
   
}