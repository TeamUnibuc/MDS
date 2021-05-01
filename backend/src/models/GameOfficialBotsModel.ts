import mongoose, { Schema, Document } from 'mongoose';

/**
 * GameOfficialBots Table
 * 
 * This is an associative table between a game and it's official bots.
 * The key of this table is the pair { BotRank, GameID }, which represents:
 *      * The rank of the bot (first bot / second bot ...)
 *      * The ID of the game the bot belongs to.
 */

class GameOfficialBotsItem {
    // ID of the bot referenced by the GameOfficialBots entry.
    BotID = "";
    // Name of the bot (e.g. "Naive randomized approach").
    BotName = "";
    // Rank of the bot, w/ respect to the game the bot belongs to.
    BotRank = 0;
    // ID of the game.
    GameID = "";
}

interface GameOfficialBotsDoc extends GameOfficialBotsItem, Document { }

const GameOfficialBotsSchema: Schema = new Schema({
    BotID: { type: String, required: true, unique: true },
    BotName: { type: String, required: false },
    BotRank: { type: Number, required: true },
    GameID: { type: String, required: true },
});

// Export the model and return your interface
export const GameOfficialBotsModel = mongoose.model<GameOfficialBotsDoc>('GameOfficialBots', GameOfficialBotsSchema, 'GameOfficialBots');
