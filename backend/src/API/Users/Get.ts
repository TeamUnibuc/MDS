/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { UsersModel } from '../../models/UsersModel';

export const Get = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const userID: string = req.body.UserID;

    const user = await UsersModel.findById(userID);

    if (user) {
        res.json({
            "status": "ok",
            "FirstName": user.FirstName,
            "LastName": user.LastName,
            "DateJoined": user.DateJoined,
            "Email": user.Email,
        });
        return;
    }

    res.json({
        "status": "fail",
    });

}
