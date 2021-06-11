import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'
import { SubmissionsModel } from '../../models/SubmissionsModel'
import { TransientFightModel } from '../../models/TransientFight'

const FailWith = (msg: string) =>
{
    return {
        status: "fail",
        error_message: msg,
    }
}

export const SubmissionStatus = async (req: Request, res: Response): Promise<void> =>
{
    const submission_id: string = req.body.SubmissionID

    try {
        const submission = await SubmissionsModel.findById(submission_id)

        if (!submission) { 
            res.json(FailWith('Submission does not exist!'))
            return 
        }

        const game = await GamesModel.findById(submission.GameID)

        if (!game) {
            res.json(FailWith('Game for this submission does not exist!'))
            return 
        }

        const transientFights = await TransientFightModel.find({SubmissionID: submission.id})

        interface TrFight {
            Status: string,
            AgainstID: string,
        }

        const statuses: TrFight[] = transientFights.map(fight => ({
            Status: fight.Status,
            AgainstID: fight.AgainstBotID,
        }))

        res.json({
            status: "ok",
            fights: statuses,
            totalFights: game.OfficialGameBots,
        })
    }
    catch (err) {
        console.log('Error getting transient submission status', err)
    }
}
