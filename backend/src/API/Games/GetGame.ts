import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'

export const GetGame = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const game_id: string = req.body.GameID;

    const game = await GamesModel.findById(game_id, {Name: 1, Description: 1, AuthorID: 1, Date: 1});

    if (game) {
        res.json({
            "status": "ok",
            "game": {
                "Name": game.Name,
                "Description": game.Description,
                "GameID": game.id,
                "AuthorID": game.AuthorID,
                "Date": game.Date,
                "OfficialBots": game.OfficialGameBots,
            },
        });
    }
    else res.json({
        "status": "fail",
        "error_message": "Id not found",
    });

}
