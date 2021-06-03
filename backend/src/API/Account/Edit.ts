/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'

export const Edit = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: signed-in

    if (!req.user || !req.isAuthenticated()) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
        return;
    }

    const firstName: string = req.body.FirstName;
    const lastName: string = req.body.LastName;
    const userName: string = req.body.Username;

    // const user = await UsersModel.findById(req.user.id);

    // if (!user) {
    //     res.json({
    //         "status": "fail",
    //         "error_message": "User not found",
    //     });
    //     return;
    // }

    req.user.FirstName = firstName;
    req.user.LastName = lastName;
    req.user.Username = userName;

    req.user.save().then(user => {
        console.log("Update user ", user);
        res.json({
            "status": "ok",
        })
    })
    .catch(e => {
        res.json({
            "status": "fail",
            "error_message": e,
        })
    })
}
