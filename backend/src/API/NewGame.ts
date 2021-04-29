import { GamesDB } from '../models/GamesModel'

export const NewGame = (req: any, res: any): void => {
    const game = new GamesDB();
    game.Name = req.query.name; // change to body when receiving over post.
    game.Description = req.query.description;
    game.OfficialGameBots = req.query.official_game_bots;
    game.GameEngine = req.query.game_engine;

    console.log(game.Name + " " + game.Description + " " + game.OfficialGameBots
                + " " + game.GameEngine);

    game.save((err, g) => {
        if (err) {
            console.error(err);
            res.json({"OK": "FALSE"});
        }
        else {
            console.log(g);
            res.json({"OK": "TRUE"});
        }
    });
}
