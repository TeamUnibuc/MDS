import {Request, Response} from 'express'

export const getGames = (_req: Request, res: Response): void => 
{
    res.json({hey: "ceva"})
}
