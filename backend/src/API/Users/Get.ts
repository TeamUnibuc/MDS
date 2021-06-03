/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { UsersModel } from '../../models/UsersModel';

export const Get = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const userID: string = req.body.UserID;

    console.log('trying to find user by ID: ', userID)
    const user = await UsersModel.findById(userID);
    console.log(user)

    if (user) {
        res.json({
            "status": "ok",
            "FirstName": user.FirstName,
            "LastName": user.LastName,
            "DateJoined": user.DateJoined,
            "Email": user.Email,
            "Username": user.Username,
        });
        return;
    }

    res.json({
        "status": "fail",
    });

}
