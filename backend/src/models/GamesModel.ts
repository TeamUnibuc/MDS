import mongoose, { Schema, Document } from 'mongoose';

/**
 * Games Table
 * 
 * An entry of the games table is a game users can submit bots to.
 */

class GamesItem {
    // Name of the game (e.g. NIM).
    Name = "";
    // Description of the game (statement).
    Description = "";
    // Engine running the game checking.
    GameEngine = "";
    // Number of official game bots.
    OfficialGameBots = 0;
    // Creator of the game.
    AuthorID = "";
    // When the game was added
    Date = new Date();
}

interface GamesDoc extends GamesItem, Document { }

const GamesSchema: Schema = new Schema({
    Name: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    GameEngine: { type: String, required: true },
    OfficialGameBots: { type: Number, required: true },
    AuthorID: { type: String, required: true },
});

// Export the model and return your interface
export const GamesModel = mongoose.model<GamesDoc>('Games', GamesSchema, 'Games');
