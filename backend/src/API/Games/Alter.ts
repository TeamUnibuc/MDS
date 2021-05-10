import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'
import { GameOfficialBotsModel } from '../../models/GameOfficialBotsModel'
import { BotsModel } from '../../models/BotsModel'

const CreateNewBotEntry = (Code: string, AuthorID: string): Promise<string> => {
    const bot = new BotsModel();
    bot.Code = Code;
    bot.AuthorID = AuthorID;
    bot.DateSubmitted = new Date();

    return bot.save()
        .then(val => {
            console.log("Saved bot!");
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

export const Alter = async (req: Request, res: Response): Promise<void> => 
{

    // TODO: verify the permission (administrator)

    if (req.body.game_id) {
        // edit a game

        const game_id: number = req.body.game_id;
        
        const editGame = await GamesModel.findById(game_id)

        if (editGame) {
            
            editGame.Name = req.body.title;
            editGame.Description = req.body.statement;
            editGame.GameEngine = req.body.game_engine;
            editGame.AuthorID = req.body.author_id;
            const bots: Array<string> = req.body.official_bots;
            editGame.OfficialGameBots = bots.length;

            // TODO: ce facem cu botii trimisi anterior??

            editGame.update().then(editGame => {
                console.log("Updated game: ", editGame);
                bots.map((bot, id) => CreateOfficialBot(bot, editGame.AuthorID, editGame.id, id));
                res.json(editGame.id);
            })
            .catch(err => res.json({ "status": "fail", "error_message": err }));
        }
        else res.json({ "status": "fail", "error_message": "Game Id not found" })
        
    }

    // create a new game, because key 'game_id' doesn't exist in request

    const game = new GamesModel();

    game.Name = req.body.title;
    game.Description = req.body.statement;
    game.GameEngine = req.body.game_engine;
    game.AuthorID = req.body.author_id;
    const bots: Array<string> = req.body.official_bots;
    game.OfficialGameBots = bots.length;

    game.save()
        .then(game => {
            console.log("Saved game: ", game);  
            bots.map((bot, id) => CreateOfficialBot(bot, game.AuthorID, game.id, id));
            res.json({"status": "ok", "game_id": game.id});
        })
        .catch(err => res.json({ "status": "fail", "error_message": err }));
    
}
