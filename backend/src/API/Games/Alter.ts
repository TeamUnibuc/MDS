/* eslint-disable no-loops/no-loops */
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

const CreateOfficialBot = (Code: string, Name: string | undefined, AuthorID: string, GameID: string, BotRank: number): Promise<string> => {
    return CreateNewBotEntry(Code, AuthorID)
        .then(async BotID => {
            const game_official_bot = new GameOfficialBotsModel();
            game_official_bot.BotID = BotID;

            if (Name == null) game_official_bot.BotName = "Bot #" + BotRank;
            else game_official_bot.BotName = Name;

            game_official_bot.BotRank = BotRank;
            game_official_bot.GameID = GameID;

            return await game_official_bot.save()
                .then(game => game.id);
        })
        .catch(e => console.log("Unable to save: ", e));
}

export const Alter = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: Creator of the game or administrator for Update, signed-in for Create

    if (!req.isAuthenticated() || !req.user) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
        return;
    }

    if (req.body.GameID) {
        // edit a game

        const game_id: string = req.body.GameID;
        
        const editGame = await GamesModel.findById(game_id)

        if (editGame) {

            if (!req.user || (req.user.IsAdministrator != true && req.user.id != editGame.AuthorID)) {
                res.json({
                    "status": "fail",
                    "error_message": "Permission denied",
                });
                return;
            }

            // stergem GameOfficialBots din baza de date pentru acest bot

            const officialBots = await GameOfficialBotsModel.find({GameID: editGame.id})
            try {
                for (let i = 0; i < officialBots.length; ++i) {
                    await officialBots[i]?.delete();
                }
            } catch (error) {
                res.json({
                    "status": "fail",
                    "error_message": error,
                });
                return;
            }

            // modificam jocul
            
            editGame.Name = req.body.Name;
            editGame.Description = req.body.Description;
            editGame.GameEngine = req.body.GameEngine;
            editGame.AuthorID = req.body.AuthorID;
            const bots: Array<string> = req.body.OfficialGameBots;
            editGame.OfficialGameBots = bots.length;
            editGame.Date = new Date();

            editGame.save().then(editGame => {
                console.log("Updated game: ", editGame);
                bots.map(async (bot, id) => {
                    const botObj = JSON.parse(bot)
                    const name: string | undefined = botObj.BotName;
                    await CreateOfficialBot(botObj.BotCode, name, editGame.AuthorID, editGame.id, id);
                })
                res.json({"status": "ok", "GameID": editGame.id});
            })
            .catch(err => res.json({ "status": "fail", "error_message": err }));
        }
        else res.json({ "status": "fail", "error_message": "Game Id not found" })
        
        return;
    }

    // create a new game, because key 'GameID' doesn't exist in request

    const game = new GamesModel();

    game.Name = req.body.Name;
    game.Description = req.body.Description;
    game.GameEngine = req.body.GameEngine;
    game.AuthorID = req.body.AuthorID;
    const bots: Array<string> = req.body.OfficialGameBots;
    game.OfficialGameBots = bots.length;
    game.Date = new Date();

    game.save()
        .then(game => {
            console.log("Saved game: ", game);  
            bots.map(async (bot, id) => {
                    const botObj = JSON.parse(bot)
                    const name: string | undefined = botObj.BotName;
                    await CreateOfficialBot(botObj.BotCode, name, game.AuthorID, game.id, id);
            })
            res.json({"status": "ok", "GameID": game.id});
        })
        .catch(err => res.json({ "status": "fail", "error_message": err }));
        
}
