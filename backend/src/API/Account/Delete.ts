/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'

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

    req.user.delete().then(user => {
        console.log("Delete user:", user);
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
