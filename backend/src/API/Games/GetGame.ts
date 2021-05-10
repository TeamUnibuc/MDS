import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'

export const GetGame = async (req: Request, res: Response): Promise<void> => 
{
    const game_id: number = req.body.game_id;

    const game = await GamesModel.findById(game_id, {Name: 1, Description: 1, AuthorID: 1});

    // TODO: should we put author username and status of the response too? 

    res.json(game)
}
