import RollFrame from './RollFrame';
import { frameCount, defaultThrowCount, specialThrowCount } from './../config/config';
import {GameStatus} from "./GameStatus";

class Game extends GameStatus {

    get isComplete(): boolean {
        return this._isComplete;
    }

    private _isComplete: boolean;

    constructor() {
        super();
        this._totalFrames = [new RollFrame(2)];
        this._isComplete = false;
    }

    public getLastFrame(): RollFrame {
        return this._totalFrames[this._totalFrames.length - 1];
    }

    public applyScore(score: number) {
        const currentFrame = this.getLastFrame();
        this._totalFrames[this._totalFrames.length - 1].update(score);
   

        if (currentFrame.isComplete && this._totalFrames.length === frameCount) {
            this._isComplete = true;
            return;
        }
        if (currentFrame.isComplete) {
            this.addFrame();
        }
    }
   public serializeFrames(): object[] {
        return this._totalFrames.map((frame) => frame.serialize());

    }

    private createFrame(): RollFrame {
        const maxThrows: number = (this._totalFrames && this._totalFrames.length === (frameCount - 1)) ?
            specialThrowCount :
            defaultThrowCount;
        return new RollFrame(maxThrows);
    }
  
    private addFrame(): void {
        const newFrame = this.createFrame();
        const lastFrame: RollFrame = this._totalFrames[this._totalFrames.length - 1];
        lastFrame.nextFrame = newFrame;
        this._totalFrames = [...this._totalFrames, newFrame];
    }
   
}

export default Game;
