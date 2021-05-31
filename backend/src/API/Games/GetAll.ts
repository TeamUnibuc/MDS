/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'
import { SubmissionsModel } from '../../models/SubmissionsModel';

export const GetAll = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const requested_games: number = req.body.requested_games;
    const requested_offset: number = req.body.requested_offset;

    const order_by_optional: string | undefined = req.body.order_by;
    const order_by: string = (order_by_optional === undefined ? 'solved' : order_by_optional);

    const result_order_optional: string | undefined = req.body.result_order;
    const result_order: string = (result_order_optional === undefined ? 'decreasing' : result_order_optional);
    const orderValue = (result_order === 'increasing' ? 1 : -1);

    const games_found: number = await GamesModel.count();

    let totalGames;

    if (order_by == 'date') {
        // sort the games by the date the game was added

        totalGames = await GamesModel.find({}, {Name: 1, Description: 1, AuthorID: 1, Date: 1}).sort({Date : orderValue});
    }
    else if (order_by == 'submissions') {
        // sort the games by the number of submissions

        // totalGames = await GamesModel.aggregate([
        //     { $lookup:
        //         {
        //             from: 'Submissions',
        //             localField: '_id',
        //             foreignField: 'GameID',
        //             as: 'submission',
        //         },
        //     },
        // ])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orderedGames: any[] = []

        totalGames = await (await GamesModel.find({}, {Name: 1, Description: 1, AuthorID: 1, Date: 1})).forEach(
            async function (game) {
                const nrSubmissions = await SubmissionsModel.find({GameID: game.id});
                orderedGames.push([nrSubmissions, game]);
            }
        )

        orderedGames.sort(function(a, b) {return a[0] - b[0]});
        if (orderValue == -1) orderedGames.reverse();

        totalGames = []
        for (let i = 0; i < orderedGames.length; ++i) totalGames.push(orderedGames[1]);
    }
    else {
        // sort the games by the number of people who solved the game.

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orderedGames: any[] = []

        totalGames = await (await GamesModel.find({}, {Name: 1, Description: 1, AuthorID: 1, Date: 1})).forEach(
            async function (game) {
                const userIds = await SubmissionsModel.find({GameID: game.id, Points: 100}).distinct('UserID');
                orderedGames.push([userIds.length, game]);
            }
        )

        orderedGames.sort(function(a, b) {return a[0] - b[0]});
        if (orderValue == -1) orderedGames.reverse();

        totalGames = []
        for (let i = 0; i < orderedGames.length; ++i) totalGames.push(orderedGames[1]);
    }

    const games = [];

    for (let i = requested_offset; i < totalGames.length && i < requested_offset + requested_games; ++i) {
        games.push({
            "Name": totalGames[i].Name,
            "Description": totalGames[i].Description,
            "GameID": totalGames[i].id,
            "AuthorID": totalGames[i].AuthorID,
            "Date": totalGames[i].Date,
        });
    }

    res.json({
        "games_found": games_found,
        "games_returned": games.length,
        "games": games,
    });
}
