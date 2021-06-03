/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { GameRankingsModel } from '../../models/GameRankingsModel';

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

        try {
            // eslint-disable-next-line no-loops/no-loops
            for (let i = 0; i < gameRankings.length; ++i) {
                await gameRankings[i]?.delete();
            }
        } catch (error) {
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
