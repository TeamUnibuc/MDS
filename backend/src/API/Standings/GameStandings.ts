import { Request, Response } from 'express'

export const GameStandings = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: signed-in

    if (!req.isAuthenticated() || !req.user) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
        return;
    }

    res.json({
        "status": "ok",
        "FirstName": req.user.FirstName,
        "LastName": req.user.LastName,
        "Email": req.user.Email,
        "DateJoined": req.user.DateJoined,
        "UserID": req.user.id,
    });
}
