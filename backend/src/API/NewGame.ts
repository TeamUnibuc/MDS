import { GamesModel } from '../models/GamesModel'
import { GameOfficialBots } from '../models/GameOfficialBotsModel'
import { BotsModel } from '../models/BotsModel'

const CreateNewBot = (Code: string, AuthorID: string): Promise<string> => {
    const bot = new BotsModel();
    bot.Code = Code;
    bot.AuthorID = AuthorID;
    bot.DateSubmitted = new Date();

    bot.save()
        .then(val => {
            return new Promise(res => res(val.id));
        })
        .catch(e => {
            return new Promise((res, err) => err(e));
        });
}

export const NewGame = (req: any, res: any): void => {
    const game = new GamesModel();
    game.Name = req.body.name;
    game.Description = req.body.description;
    game.GameEngine = req.body.engine;
    game.AuthorID = req.body.author;
    const bots: Array<string> = req.body.bots;
    game.OfficialGameBots = bots.length;


    console.log(game.Name + " " + game.Description + " " + game.OfficialGameBots
                + " " + game.GameEngine);

    game.save((err, g) => {
        if (err) {
            console.error(err);
            res.json({"OK": "FALSE"});
        }
        else {
            console.log(g);
            res.json({"OK": "TRUE"});
        }
    });
}
