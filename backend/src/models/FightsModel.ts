import mongoose, { Schema, Document } from 'mongoose';

/**
 * Fights Table
 * 
 * Stores all the fights.
 */

class FightsItem {
    // IDs of the bots who played in the fight.
    BotIDs = <string[]>[];
    // Game of fight was about.
    GameID = "";
    // Bot who won the fight.
    WinnerID = "";
    // Logs of the battle.
    BattleLogs = "";
}

interface FightsDoc extends FightsItem, Document { }

const FightsSchema: Schema = new Schema({
    BotIDs: { type: Array, required: true },
    GameID: { type: String, required: true },
    WinnerID: { type: String, required: true },
    BattleLogs: { type: String, required: true },
});

// Export the model and return your interface
export const FightsModel = mongoose.model<FightsDoc>('Fights', FightsSchema, 'Fights');
