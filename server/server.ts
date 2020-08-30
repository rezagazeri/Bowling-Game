import express from 'express';
const http = require('http');

const app = express();
app.use(express.json());

            app.get('/',  (req: express.Request, res: express.Response)=>{
                // try{ 
                     res.status(200).json({message:"fffffffffffffff"})
                    // data:this.Game.serializeFrames(),
                    // countActiveKeys : App.calculateChoices(currentScore)
                // })}catch(err){
                //     console.log(err);
                // } 

            });          
const port =  4000;
const server = app.listen(port, () => {
  console.log('hello from server');
});