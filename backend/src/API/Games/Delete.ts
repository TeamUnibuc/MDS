import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'

export const Delete = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: Creator of the game or administrator

    if (!req.isAuthenticated()) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
        return;
    }

    const game_id: string = req.body.GameID;

    const game = await GamesModel.findById(game_id);

    if (game) {

        if (!req.user || (req.user.IsAdministrator != true && req.user.id != game.AuthorID)) {
            res.json({
                "status": "fail",
                "error_message": "Permission denied",
            });
            return;
        }

        game.delete().then(game => {
            console.log("Delete game:", game);
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
        //     game.delete()
        //     res.json({
        //         "status": "ok",
        //     });
        // } catch (error) {
        //     res.json({
        //         "status": "fail",
        //         "error_message": error,
        //     });
        // }
    }
    else {
        res.json({
            "status": "fail",
            "error_message": "Game Id not found",
        });
    }

}
