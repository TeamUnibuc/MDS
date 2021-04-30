import mongoose, { Schema, Document } from 'mongoose';

/**
 * GobalRankings Table
 * 
 * Stores the global game rankings.
 */

class GlobalRankingsItem {
    // User.
    UserID = "";
    // Number of bots the user has beaten.
    TotalBotsBeaten = 0;
    // Total number of points.
    TotalPoints = 0;
}

interface GlobalRankingsDoc extends GlobalRankingsItem, Document { }

const GlobalRankingsSchema: Schema = new Schema({
    UserID: { type: String, required: true },
    TotalBotsBeaten: { type: Number, required: true },
    TotalPoints: { type: Number, required: true },    
});

// Export the model and return your interface
export const GlobalRankingsModel = mongoose.model<GlobalRankingsDoc>('GlobalRankings', GlobalRankingsSchema, 'GlobalRankings');
