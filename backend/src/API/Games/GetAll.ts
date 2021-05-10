import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'

export const GetAll = async (req: Request, res: Response): Promise<void> => 
{
    const requested_games: string = req.body.requested_games;
    const request_offset: number = req.body.requested_offset;

    const order_by_optional: string | undefined = req.body.order_by;
    const order_by: string = (order_by_optional === undefined ? 'solved' : order_by_optional);

    const result_order_optional: string | undefined = req.body.result_order;
    const result_order: string = (result_order_optional === undefined ? 'decreasing' : 'increasing');

    const games_found: number = await GamesModel.count();
    // const games =
    //     GamesModel.find().sort()

}
