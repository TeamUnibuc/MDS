import mongoose, { Schema, Document } from 'mongoose';

/**
 * TransientFights Table
 * 
 * Stores all statuses of Fights while they are being played
 */

class TransientFightItem {
    // SubmissionID the fight is corresponding to
    SubmissionID = "";
    // User who made the submission
    UserID = "";
    // Against which bot
    AgainstBotID = "";
    // Bot sent by the user.
    Status = "";
}

interface TransientFightDoc extends TransientFightItem, Document { }

const TransientFightSchema: Schema = new Schema({
    SubmissionID: { type: String, required: true },
    UserID: { type: String, required: true },
    AgainstBotID: { type: String, required: true },
    Status: { 
        type: String, 
        enum: ['unknown', 'won', 'lost', 'error'],
        required: true,
    },
});

// Export the model and return your interface
export const TransientFightModel = mongoose.model<TransientFightDoc>('TransientFights', TransientFightSchema, 'TransientFights');
