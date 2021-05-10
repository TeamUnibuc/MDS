import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'

export const Delete = async (req: Request, res: Response): Promise<void> => 
{
    const game_id: number = req.body.game_id;

    const game = await GamesModel.findById(game_id);

    try {
        game?.delete()
        res.json({
            "status": "ok"
        });
    } catch (error) {
        res.json({
            "status": "fail",
            "error_message": error
        });
    }

}
