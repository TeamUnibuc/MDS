/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { BotsModel } from '../../models/BotsModel';
import { FightsModel } from '../../models/FightsModel';
import { GamesModel } from '../../models/GamesModel';
import { SubmissionsModel } from '../../models/SubmissionsModel'

export const Details = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: 
    // Administrator or
    // Creator of the game or
    // Creator of the submission or
    // User solved the game the submission was made

    if (!req.isAuthenticated()) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
        return;
    }

    const submission_id: string = req.body.SubmissionID;

    const submission = await SubmissionsModel.findById(submission_id);

    if (submission) {

        const game = await GamesModel.findById(submission.GameID);
        let solvedGame = false;

        if (req.user && game) {
            const ids = await SubmissionsModel.find({GameID: game.id, UserID: req.user.id, Points: 100});
            if (ids.length > 0) {
                solvedGame = true;
            }
        }

        if (!req.user || (req.user.IsAdministrator != true && req.user.id != submission.UserID && req.user.id != game?.AuthorID && !solvedGame)) {
            res.json({
                "status": "fail",
                "error_message": "Permission denied",
            });
            return;
        }

        const bot = await BotsModel.findById(submission.BotID);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fightsInfo: Array<any> = [];

        for (const fightID of submission.FightIDs) {
            const fightInfo = await FightsModel.findById(fightID);
            fightsInfo.push({
                "logs": fightInfo?.BattleLogs,
                "won": (fightInfo?.WinnerID == submission.BotID ? true : false),
            })
        }

        res.json({
            "status": "ok",
            "Date": submission.SubmissionDate,
            "Score": submission.Points,
            "GameID": submission.GameID,
            "AuthorID": submission.UserID,
            "SubmissionID": submission.id,
            "compilation_message": bot?.CompilationMessage,
            "results": fightsInfo,
            "SubmissionCode": bot?.Code,
        });
        return;
    }

    res.json({
        "status": "fail",
        "error_mesagge": "Game Id not found",
    });

}
