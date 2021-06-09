/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { UsersModel } from '../../models/UsersModel';

export const GetByUsername = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: None

    const Username: string = req.body.Username;

    // Should contain exctly one element
    const userList = await UsersModel.find({ Username: Username });

    try {
        const user = userList[0]
        res.json({
            status: "ok",
            FirstName: user.FirstName,
            LastName: user.LastName,
            DateJoined: user.DateJoined,
            Email: user.Email,
            Username: user.Username,
            UserID: user.id,
            IsAdministrator: user.IsAdministrator,
        });
        return;
    }
    catch (err) {
        res.json({
            status: "fail",
            error_message: "Username does not exist!",
        });
    }
}
