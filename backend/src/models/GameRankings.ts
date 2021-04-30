import mongoose, { Schema, Document } from 'mongoose';

/**
 * GameRankings Table
 * 
 * Stores for each game how much points each user has.
 */

class GameRankingsItem {
    // Game this ranking entry belongs to.
    GameID = "";
    // User having this entry.
    UserID = "";
    // Number of points.
    Points = 0;
}

interface GameRankingsDoc extends GameRankingsItem, Document { }

const GameRankingsSchema: Schema = new Schema({
    GameID: { type: String, required: true },
    UserID: { type: String, required: true },
    Points: { type: Number, required: true },
});

// Export the model and return your interface
export const GameRankingsModel = mongoose.model<GameRankingsDoc>('GameRankings', GameRankingsSchema, 'GameRankings');
