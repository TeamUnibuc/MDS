/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { GameRankingsModel } from '../../models/GameRankingsModel';
import { GamesModel } from '../../models/GamesModel';
import { SubmissionsModel } from '../../models/SubmissionsModel';

export const Delete = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: signed-in

    if (!req.user || !req.isAuthenticated()) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
        return;
    }

    req.user.delete().then(async user => {
        console.log("Delete user:", user);
        // daca nu dam logout acum, nu vom putea sa dam logout niciodata,
        // ca nu vom mai fi in baza de date :DDD

        const gameRankings = await GameRankingsModel.find({UserID: user.id});
        const games = await GamesModel.find({AuthorID: user.id});
        const submissions = await SubmissionsModel.find({ UserID: user.id });

        try {
            // eslint-disable-next-line no-loops/no-loops
            for (let i = 0; i < gameRankings.length; ++i) {
                await gameRankings[i]?.delete();
            }
            for (let i = 0; i < submissions.length; ++i) {
                await submissions[i]?.delete();
            }
            for (let i = 0; i < games.length; ++i) {
                const game_submissions = await SubmissionsModel.find({ GameID: games[i].id });
                for (let j = 0; j < game_submissions.length; j++) {
                    await game_submissions[j].delete();
                }
                await games[i]?.delete();
            }
            
        } catch (error) {
            console.log("Unable to delete:" + error);
            res.json({
                "status": "fail",
                "error_message": "User deleted, but rank not deleted!",
            });
            return;
        }

        req.logout()
        res.json({
            "status": "ok",
        })
    })
    .catch(e => {
        res.json({
            "status": "fail",
            "error_message": e,
        })
    });

    // try {
    //     req.user.delete();
    //     res.json({
    //         "status": "ok",
    //     })
    // } catch (error) {
    //     res.json({
    //         "status": "fail",
    //         "error_message": error,
    //     })
    // }
}
