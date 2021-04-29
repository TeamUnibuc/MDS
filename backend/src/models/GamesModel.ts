import mongoose, { Schema, Document } from 'mongoose';

class GamesModel
{
  Name = "";
  Description = "";
  GameEngine = "";
  OfficialGameBots = 0;
}

interface GamesDoc extends GamesModel, Document { }

const GamesSchema: Schema = new Schema({
  Name: { type: String, required: true, unique: true },
  Description: { type: String, required: true },
  GameEngine: { type: String, required: true },
  OfficialGameBots: { type: Number, required: true },
});

// Export the model and return your interface
export const GamesDB = mongoose.model<GamesDoc>('Games', GamesSchema);
