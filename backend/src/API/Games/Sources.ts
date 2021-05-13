import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'
import { BotsModel } from '../../models/BotsModel'
import { GameOfficialBotsModel } from '../../models/GameOfficialBotsModel'

export const Sources = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: Creator of the game or administrator

    if (!req.isAuthenticated()) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
    }

    const game_id: string = req.body.game_id;

    const game = await GamesModel.findById(game_id)

    if (game) {

        if (!req.user || (req.user.IsAdministrator != true && req.user.id != game.AuthorID)) {
            res.json({
                "status": "fail",
                "error_message": "Permission denied",
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const official_bots_info: Array<any> = [];

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const official_bots = 
        (await GameOfficialBotsModel.find({GameId: game_id})).forEach(async function(bot){
            const botInfo = await BotsModel.findById(bot.BotID);
            if (botInfo) {
                official_bots_info.push({
                    "_id": botInfo.id,
                    "BotName": bot.BotName,
                    "BotRank": bot.BotRank,
                    "Code": botInfo.Code,
                    "DateSubmitted": botInfo.DateSubmitted,
                    "AuthorID": botInfo.AuthorID,
                    "CompilationMessage": botInfo.CompilationMessage,
                });
            }
        })

        res.json({
            "status": "ok",
            "game_engine": game.GameEngine,
            "official_bots": official_bots_info,
        })
    }

    res.json({
        "status": "fail",
        "error_mesagge": "Game Id not found",
    })
}
