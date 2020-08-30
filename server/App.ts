import console from 'console';
import express from 'express';
import cors from 'cors';

import { pinCount } from './src/controller/config/config';
import Game from './src/controller/GameController/Game';
import RollFrame from './src/controller/GameController/RollFrame';

const app = express();

class App {

   private _game: Game;
    constructor() {
        this._game = new Game();
        this.setupExpress();
        this.setupConfig();
    }
     private setupExpress(){
        const server = app.listen(4000, () => {
        console.log('Start Bowling Game server!...');
        });    
        
     }
     private setupConfig(){
        app.use(express.json());
        app.use(cors());
     }
  
    public lanch() { 
        // app.get('/gamestatus',  async (req: express.Request, res: express.Response)=>{
        //     try{ 
        //          await res.status(200).json({
        //             status: 'success',
        //             data:this.Game.serializeFrames(),
        //             countActiveKeys : this.calculateChoices(currentScore)
        //          })
        //         }catch(err){
        //             console.log(err);
        //         }
        // });        

            app.post('/bowling',  async (req: express.Request, res: express.Response )=>{
                try{ 
                    if(req.body.scoreRoll !== "RESTART"){
                        const score =parseInt(req.body.scoreRoll,10);
                        this._game.applyScore(score);
                        const currentScore = this._game.getLastFrame().throws;
                        await res.status(201).json({
                            status: 'success',
                            data:this._game.serializeFrames(),
                            countActiveKeys : App.calculateChoices(currentScore)
                                        })
                   }   
                //    const app = new App();
                //     app.lanch();
            
                }catch(err){
                        console.log(err);
                }
            });
           
    }

    public static calculateChoices(lastCount): number {
        const maxCount = pinCount - lastCount;
        return [...Array(maxCount + 1).keys()].length;
    }
}

export default App;