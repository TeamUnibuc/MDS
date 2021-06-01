import { Request, Response } from 'express'
import { GameRankingsModel } from '../../models/GameRankingsModel';
import { SubmissionsModel } from '../../models/SubmissionsModel';

export const UserStatsGame = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const gameID = req.body.GameID;
    const userID = req.body.UserID;

    const submissions = await SubmissionsModel.find({GameID: gameID, UserID: userID}).sort({Points: -1});

    if (submissions.length == 0) {
        res.json({
            "status": "ok",
            "has_submissions": false,
        });
        return;
    }

    const submissionIds: string[] = [];

    // eslint-disable-next-line no-loops/no-loops
    for (const submission of submissions) submissionIds.push(submission.id);

    const ranks = await GameRankingsModel.find({GameID: gameID}).sort({Points: -1});
    let rank = -1;
    // eslint-disable-next-line no-loops/no-loops
    for (let i = 0; i < ranks.length; ++i) 
        if (ranks[i].UserID == userID) {
            rank = i + 1;
            break;
        }

    if (rank == -1) {
        res.json({
            "status": "fail",
            "error_message": "User has submissions to this Game, but does not appear in GameRankings Table!",
        });
        return;
    }

    res.json({
        "status": "ok",
        "has_submissions": true,
        "submissions_count": submissionIds.length,
        "rank": rank,
        "best_submission_id": submissionIds[0],
        "submissionIDs": submissionIds,
    });
}
