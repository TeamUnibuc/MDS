import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'
import { BotsModel } from '../../models/BotsModel'
import { GameOfficialBotsModel } from '../../models/GameOfficialBotsModel'

export const Sources = async (req: Request, res: Response): Promise<void> => 
{

    // TODO: verify the permission (creator of the game or administrator)

    const game_id: number = req.body.game_id;

    const game = await GamesModel.findById(game_id)

    if (game) {

        var official_bots_info: (ReturnType<typeof BotsModel.findById>)[] = [];

        const official_bots = 
        (await GameOfficialBotsModel.find({GameId: game_id}, {BotID: 1})).forEach(function(bot){
            const botInfo = BotsModel.findById(bot.BotID);
            if (botInfo) {
                official_bots_info.push(botInfo);
            }
        })

        res.json({
            "status": "ok",
            "game_engine": game.GameEngine,
            "official_bots": official_bots_info
        })
    }

    res.json({
        "status": "fail",
        "error_mesagge": "Game Id not found"
    })
}
