import inquirer from 'inquirer';

import { pinCount, frameCount } from './config';
import Game from './Game';
import PrintService from './PrintService';

class App {

    Game: Game;
    PrintService: PrintService;
    baseQuestion: inquirer.Question;

    constructor() {
        this.Game = new Game();
        this.PrintService = new PrintService(frameCount);
        this.baseQuestion = {
            type: 'list',
            name: 'score',
            message: 'How many pins did you get?',
            choices: []
        }
    }

    public start() {
        const currentScore = this.Game.getLastFrame().sumUpThrows();
        const question = {
            ...this.baseQuestion,
            ...{ choices: App.calculateChoices(currentScore) }
        };
        inquirer
            .prompt([question])
            .then(({ score }) => {
                this.Game.applyScore(parseInt(score, 10 ));
            })
            .then(() => {
                return (this.Game.isComplete) ?
                    Promise.reject() :
                    Promise.resolve();
            })
            .then(() => {
                this.start();
            })
            .catch(() => {
                this.PrintService.print(this.Game.serializeFrames());
            })
    }

    private static calculateChoices(lastCount): string[] {
        const maxCount = pinCount - lastCount;
        return [...Array(maxCount + 1).keys()].map(v => v + '')
    }
}

export default App;