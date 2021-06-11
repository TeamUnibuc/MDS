/* eslint-disable no-loops/no-loops */
import { Request, Response } from 'express'
import { GamesModel } from '../../models/GamesModel'
import { GameOfficialBotsModel } from '../../models/GameOfficialBotsModel'
import { BotsModel } from '../../models/BotsModel'
import { FightsModel } from '../../models/FightsModel'
import { SubmissionsModel } from '../../models/SubmissionsModel'
import { EngineConnection } from '../../EngineConnection'
import { GameRankingsModel } from '../../models/GameRankingsModel'
import { TransientFightModel } from '../../models/TransientFight'

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
            fight.BattleLogs = fightInfo.compilation_message || 'No compilation message';
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

    const didUserWin = async (fightID: string, userBotID: string) =>
    {
        const winnerID = (await FightsModel.findById(fightID, {WinnerID: 1}))?.WinnerID;
        return winnerID === userBotID
    }

    try {
        CreateNewBotEntry(code, req.user.id).then(async botID => {
            const submission = new SubmissionsModel();

            submission.UserID = req.user.id;
            submission.GameID = gameID;
            submission.BotID = botID;
            submission.SubmissionDate = new Date();
            submission.Status = "pending";
            submission.Points = 0;

            
            await submission.save()
            .then(sub => {
                console.log(`Saved submission from User: ${sub.UserID} as pending!`)
            })
            .catch(err => {
                throw new Error(`Saving as draft error: ${err}`)
            })

            // Send submission ID back to the client
            res.json({
                status: "ok",
                SubmissionID: submission.id,
            })

            // Now perform the evaluations

            const officialBots = await GameOfficialBotsModel.find({GameID: gameID});
            console.log(officialBots);

            const fightIds: Array<string> = [];

            await Promise.all(officialBots.map(bot =>
                CreateNewFight([botID, bot.BotID], gameID).then(async fightID => {
                    fightIds.push(fightID);
                    const won = await didUserWin(fightID, botID)
                    const transient = new TransientFightModel({
                        SubmissionID: submission.id,
                        UserID: submission.UserID,
                        AgainstBotID: bot.BotID,
                        Status: (won ? 'won' : 'lost'),
                    })
                    await transient.save()  // am pus await ca eroarea sa fie captata aici, si nu sa fie aruncata in afara
                })
                .catch(async e => {
                    const transient = new TransientFightModel({
                        SubmissionID: submission.id,
                        UserID: submission.UserID,
                        AgainstBotID: bot.BotID,
                        Status: 'error'})
                    await transient.save()
                    throw new Error(e);
                })
            ));

            submission.FightIDs = fightIds;

            let nrWins = 0;

            for (const fightID of fightIds) {
                const won = await didUserWin(fightID, botID)
                if (won) nrWins++;
            }
            
            console.log(officialBots);
            submission.Points = nrWins * 100 / officialBots.length;
            submission.Status = 'done';

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
                    // res.json({
                    //     status: "ok",
                    //     SubmissionID: submission.id,
                    // });
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
        console.log("Aici ar trebui sa arunc un json cu o eroare, oh well")
        // res.json({
        //     "status": "fail",
        //     "error_message": e,
        // });
    }
}
