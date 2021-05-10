import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'

export const GetAll = async (req: Request, res: Response): Promise<void> => 
{
    const requested_games: number = req.body.requested_games;
    const requested_offset: number = req.body.requested_offset;

    const order_by_optional: string | undefined = req.body.order_by;
    const order_by: string = (order_by_optional === undefined ? 'solved' : order_by_optional);

    const result_order_optional: string | undefined = req.body.result_order;
    const result_order: string = (result_order_optional === undefined ? 'decreasing' : 'increasing');

    const games_found: number = await GamesModel.count();

    var totalGames;

    if (order_by == 'date') {
        // TODO: sort the games by the date the game was added

        totalGames = await GamesModel.find({}, {Name: 1, Description: 1, AuthorID: 1}).sort({Name : 1});
    }
    else if (order_by == 'solved') {
        // TODO: sort the games by the number of successful submissions

        totalGames = await GamesModel.find({}, {Name: 1, Description: 1, AuthorID: 1}).sort({Name : 1});
    }
    else {
        // TODO: sort the games by the number of submissions

        totalGames = await GamesModel.find({}, {Name: 1, Description: 1, AuthorID: 1}).sort({Name : 1});
    }

    var games = [];

    for (let i = requested_offset; i < totalGames.length && i < requested_offset + requested_games; ++i) {
        games.push(totalGames[i])
    }

    // var games = async () => {
    //     if (order_by == 'date') return await GamesModel.find({}).sort({Name : 1})
    //     else if (order_by == 'solved') return await GamesModel.find({}).sort({Name : 1})
    //     else return await GamesModel.find({}).sort({Name : 1})
    // }

    res.json({
        games_found: games_found,
        games_returned: games.length,
        games: games
    })
}
