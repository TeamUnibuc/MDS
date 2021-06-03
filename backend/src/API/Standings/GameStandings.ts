/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { GameRankingsModel } from '../../models/GameRankingsModel';
import { SubmissionsModel } from '../../models/SubmissionsModel';
import { UsersModel } from '../../models/UsersModel';

export const GameStandings = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const requested_entries: number = req.body.requested_entries;
    const requested_offset: number = req.body.requested_offset;

    const order_by_optional: string | undefined = req.body.order_by;
    const order_by: string = (order_by_optional === undefined ? 'score' : order_by_optional);

    const result_order_optional: string | undefined = req.body.result_order;
    const result_order: string = (result_order_optional === undefined ? 'decreasing' : result_order_optional);
    const orderValue = (result_order === 'increasing' ? 1 : -1);

    const gameID = req.body.GameID;

    const totalUsers = await UsersModel.find();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderedUsers: any[] = [];

    for (let i = 0; i < totalUsers.length; ++i) {
        const nrSubmissions = await SubmissionsModel.find({UserID: totalUsers[i].id, GameID: gameID}).count();

        if (nrSubmissions == 0) continue;

        let totalPoints = 0;
        const userRanking = await GameRankingsModel.find({UserID: totalUsers[i].id, GameID: gameID});
        for (const rank of userRanking) totalPoints += rank.Points;

        orderedUsers.push([nrSubmissions, totalPoints, totalUsers[i]]);
    }

    if (order_by == 'submissions') orderedUsers.sort(function(a, b) {return a[0] - b[0]});
    else orderedUsers.sort(function(a, b) {return a[1] - b[1]});

    if (orderValue == -1) orderedUsers.reverse();

    const entries = [];

    // eslint-disable-next-line no-loops/no-loops
    for (let i = requested_offset; i < orderedUsers.length && i < requested_offset + requested_entries; ++i) {

        const submission = await SubmissionsModel.find({UserID: orderedUsers[i][2].id, GameID: gameID}).sort({Points: -1}).limit(1);
        
        entries.push({
            "best_sumission_id": submission[0].id,
            "submissions": orderedUsers[i][0],
            "Points": orderedUsers[i][1],
            "AuthorID": orderedUsers[i][2].id,
            "AuthorUsername": orderedUsers[i][2].Username,
        });
    }

    res.json({
        "entries_returned": entries.length,
        "entries_found": orderedUsers.length,
        "entries": entries,
    });

    // if (order_by == 'submissions') {
    //     //sort the users by the number of submissions

    //     //eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const orderedUsers: any[] = []

    //     // eslint-disable-next-line no-loops/no-loops
    //     for (let i = 0; i < totalUsers.length; ++i) {
    //         const nrSubmissions = await SubmissionsModel.find({UserID: totalUsers[i].UserID, GameID: gameID}).count();
    //         orderedUsers.push([nrSubmissions, totalUsers[i]]);
    //     }

    //     orderedUsers.sort(function(a, b) {return a[0] - b[0]});
    //     if (orderValue == -1) orderedUsers.reverse();

    //     totalUsers = []
    //     // eslint-disable-next-line no-loops/no-loops
    //     for (let i = 0; i < orderedUsers.length; ++i) totalUsers.push(orderedUsers[1]);
    // }

    // const entries = [];

    // // eslint-disable-next-line no-loops/no-loops
    // for (let i = requested_offset; i < totalUsers.length && i < requested_offset + requested_entries; ++i) {

    //     const submission = await SubmissionsModel.find({UserID: totalUsers[i].UserID, GameID: gameID}).sort({Points: -1}).limit(1);
    //     const nrSubmissions = await SubmissionsModel.find({UserID: totalUsers[i].UserID, GameID: gameID}).count();

    //     entries.push({
    //         "best_sumission_id": submission[0].id,
    //         "submissions": nrSubmissions,
    //         "Points": totalUsers[i].Points,
    //         "AuthorID": totalUsers[i].UserID,
    //     });
    // }
}
