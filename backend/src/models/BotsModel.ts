import mongoose, { Schema, Document } from 'mongoose';

/**
 * Bots Table
 * 
 * An entry of the bots table is a source code (a bot), submited by a user.
 * Bots can be either submissions either official game bots.
 */

class BotsItem {
    // Source code of the bot.
    Code = "";
    // When the bot was submitted.
    DateSubmitted = new Date();
    // ID of the author.
    AuthorID = "";
}

interface BotsDoc extends BotsItem, Document { }

const BotsSchema: Schema = new Schema({
    Code: { type: String, required: true },
    DateSubmitted: { type: Date, required: true },
    AuthorID: { type: String, required: true },
});

// Export the model and return your interface
export const BotsModel = mongoose.model<BotsDoc>('Bots', BotsSchema, 'Bots');
