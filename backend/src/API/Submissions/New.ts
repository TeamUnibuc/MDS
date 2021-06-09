/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'
import { GameOfficialBotsModel } from '../../models/GameOfficialBotsModel'
import { BotsModel } from '../../models/BotsModel'
import { FightsModel } from '../../models/FightsModel'
import { SubmissionsModel } from '../../models/SubmissionsModel'
import { EngineConnection } from '../../EngineConnection'
import { GameRankingsModel } from '../../models/GameRankingsModel'

const CreateNewBotEntry = (Code: string, AuthorID: string): Promise<string> => {
    const bot = new BotsModel();
    bot.Code = Code;
    bot.AuthorID = AuthorID;
    bot.DateSubmitted = new Date();
    bot.CompilationMessage = "Not compiled yet!"

    return bot.save()
        .then(val => {
            console.log("Saved bot!");
            return val.id;
        })
        .catch(e => {
            console.log("Unable to save bot!");
            throw new Error(e);
        });
}

const CreateNewFight = async (BotIDs: Array<string>, GameID: string): Promise<string> => {
    const fight = new FightsModel();

    const game = await GamesModel.findById(GameID);
    const botsCode: Array<string> = [];

    for (const botID of BotIDs) {
        const bot = await BotsModel.findById(botID);
        if (bot) botsCode.push(bot.Code);
    }

    fight.BotIDs = BotIDs;
    fight.GameID = GameID;

    if (!game) throw new Error("Game Id not found for this fight!");

    await EngineConnection.Fight(game.GameEngine, botsCode).then(fightInfo => {
        if (fightInfo.status == "ok") {
            fight.BattleLogs = fightInfo.logs;
            fight.WinnerID = BotIDs[fightInfo.winner];
        }
        else if (fightInfo.status == "compilation_error") {
            fight.WinnerID = "-1";
            fight.BattleLogs = fightInfo.compilation_message;
        }
        else {
            console.log("EngineConnection error!");
            throw new Error(fightInfo.reason);
        }
    })
    .catch(e => {
        console.log("EngineConnection.Fight failed!", e);
        throw new Error(e);
    });

    return fight.save()
        .then(val => {
            console.log("Saved fight!");
            return val.id;
        })
        .catch(e => {
            console.log("Unable to save fight!");
            throw new Error(e);
        })
}

export const New = async (req: Request, res: Response): Promise<void> => 
{
    // Permissions required: signed-in

    if (!req.isAuthenticated() || !req.user) {
        res.json({
            "status": "fail",
            "error_message": "You need to be authenticated to do this operation",
        });
        return;
    }

    const gameID = req.body.GameID;
    const code = req.body.SubmissionCode;

    try {
        CreateNewBotEntry(code, req.user.id).then(async botID => {
            const submission = new SubmissionsModel();

            submission.UserID = req.user.id;
            submission.GameID = gameID;
            submission.BotID = botID;
            submission.SubmissionDate = new Date();

            const officialBots = await GameOfficialBotsModel.find({GameID: gameID});
            console.log(officialBots);

            const fightIds: Array<string> = [];

            await Promise.all(officialBots.map(bot =>
                CreateNewFight([botID, bot.BotID], gameID).then(fightID => {
                    fightIds.push(fightID);
                })
                .catch(e => {
                    throw new Error(e);
                })
            ));

            submission.FightIDs = fightIds;

            let nrWins = 0;

            for (const fightID of fightIds) {
                const winnerID = (await FightsModel.findById(fightID, {WinnerID: 1}))?.WinnerID;
                if (winnerID == botID) nrWins++;
            }
            
            console.log(officialBots);
            submission.Points = nrWins * 100 / officialBots.length;

            const gameRank = await GameRankingsModel.find({GameID: gameID, UserID: req.user.id});

            if (!gameRank || gameRank.length == 0) {
                const newRank = new GameRankingsModel();
                newRank.GameID = gameID;
                newRank.UserID = req.user.id;
                newRank.Points = submission.Points;
                await newRank.save()
                    .catch(e => {
                        console.log("Unable to save rank!");
                        throw new Error(e);
                    });
            }
            else if (gameRank[0].Points < submission.Points) {
                gameRank[0].Points = submission.Points;
                await gameRank[0].save()
                    .catch(e => {
                        console.log("Unable to save rank!");
                        throw new Error(e);
                    });
            }

            await submission.save()
                .then(submission => {
                    console.log("Saved submission: ", submission);
                    res.json({
                        "status": "ok",
                        "SubmissionID": submission.id,
                    });
                })
                .catch(e => {
                    console.log("Unable to save submission!");
                    throw new Error(e);
                });
        })
        .catch(e => {
            console.log("Unable to save bot!");
            throw new Error(e);
        })
    } catch (e) {
        res.json({
            "status": "fail",
            "error_message": e,
        });
    }
}
