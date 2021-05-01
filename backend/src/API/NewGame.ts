import { GamesModel } from '../models/GamesModel'
import { GameOfficialBotsModel } from '../models/GameOfficialBotsModel'
import { BotsModel } from '../models/BotsModel'

const CreateNewBotEntry = (Code: string, AuthorID: string): Promise<string> => {
    const bot = new BotsModel();
    bot.Code = Code;
    bot.AuthorID = AuthorID;
    bot.DateSubmitted = new Date();

    return bot.save()
        .then(val => {
            console.log("SAved bot!");
            return val.id;
        })
        .catch(e => {
            console.log("Unable to save bot!");
            throw new Error(e);
        });
}

const CreateOfficialBot = (Code: string, AuthorID: string, GameID: string, BotRank: number): Promise<string> => {
    return CreateNewBotEntry(Code, AuthorID)
        .then(async BotID => {
            const game_official_bot = new GameOfficialBotsModel();
            game_official_bot.BotID = BotID;
            game_official_bot.BotName = "Bot #" + BotRank;
            game_official_bot.BotRank = BotRank;
            game_official_bot.GameID = GameID;

            return await game_official_bot.save()
                .then(game => game.id);
        })
        .catch(e => console.log("Unable to save: ", e));
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

    game.save()
        .then(game => {
            console.log("Saved game: ", game);  
            bots.map((bot, id) => CreateOfficialBot(bot, game.AuthorID, game.id, id));
            res.json(game);
        })
        .catch(err => res.json({ "OK": "False", "err": err }));
}
