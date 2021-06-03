/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { GameRankingsModel } from '../../models/GameRankingsModel';
import { SubmissionsModel } from '../../models/SubmissionsModel';
import { UsersModel } from '../../models/UsersModel';

export const UserStatsGlobal = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const userID = req.body.UserID;

    const nrSubmissions = await SubmissionsModel.find({UserID: userID}).count();

    const users = await UsersModel.find();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderedUsers: any[] = [];

    for (const user of users) {
        let totalPoints = 0;
        const userRanking = await GameRankingsModel.find({UserID: user.id});
        for (const rankEntry of userRanking) totalPoints += rankEntry.Points;

        orderedUsers.push([totalPoints, user.id]);
    }

    orderedUsers.sort(function(a, b) {return b[0] - a[0]});

    let userTotalPoints = 0;
    let userRank = -1;

    for (let i = 0; i < orderedUsers.length; ++i)
        if (orderedUsers[i][1] == userID) {
            userTotalPoints = orderedUsers[i][0];
            userRank = i + 1;
            break;
        }

    if (userRank == -1) userRank = orderedUsers.length + 1;

    res.json({
        "submissions": nrSubmissions,
        "TotalPoints": userTotalPoints,
        "rank": userRank,
    });
}
