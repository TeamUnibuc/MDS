/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { SubmissionsModel } from '../../models/SubmissionsModel'
import { UsersModel } from '../../models/UsersModel'
import { GamesModel } from '../../models/GamesModel'
 
export const GetAll = async (req: Request, res: Response): Promise<void> => 
{
    const requested_submissions: number = req.body.requested_submissions;
    const requested_offset: number = req.body.requested_offset;

    const order_by_optional: string | undefined = req.body.order_by;
    const order_by: string = (order_by_optional === undefined ? 'date' : order_by_optional);

    const result_order_optional: string | undefined = req.body.result_order;
    const result_order: string = (result_order_optional === undefined ? 'decreasing' : result_order_optional);
    const orderValue = (result_order === 'increasing' ? 1 : -1);

    let totalSubmissions;

    if (order_by == 'date') {
        totalSubmissions = await SubmissionsModel.find({}).sort({SubmissionDate : orderValue});
    }
    else {
        totalSubmissions = await SubmissionsModel.find({}).sort({Points : orderValue});
    }

    let submissions = [];

    if (req.body.GameID) {
        const game_id: string = req.body.GameID;
        for (const submission of totalSubmissions)
            if (submission.GameID == game_id) submissions.push(submission);
        totalSubmissions = submissions;
    }

    submissions = [];

    if (req.body.UserID) {
        const user_id: string = req.body.UserID;
        for (const submission of totalSubmissions)
            if (submission.UserID == user_id) submissions.push(submission);
        totalSubmissions = submissions;
    }

    const submissions_found = totalSubmissions.length;

    submissions = [];

    for (let i = requested_offset; i < totalSubmissions.length && i < requested_offset + requested_submissions; ++i) {
        const user = await UsersModel.findById(totalSubmissions[i].UserID, {Username: 1})
                            .catch(() => null);
        const game = await GamesModel.findById(totalSubmissions[i].GameID, {Name: 1})
                            .catch(() => null);
        submissions.push({
            "Date": totalSubmissions[i].SubmissionDate,
            "Score": totalSubmissions[i].Points,
            "GameID": totalSubmissions[i].GameID,
            "AuthorID": totalSubmissions[i].UserID,
            "SubmissionID": totalSubmissions[i].id,
            "AuthorUsername": (user?.Username ?? "Inexistent"),
            "GameName": (game?.Name ?? "Inexistent")
        });
    }

    res.json({
        "status": "ok",
        "submissions_found": submissions_found,
        "submissions_returned": submissions.length,
        "submissions": submissions,
    });
}
