import mongoose, { Schema, Document } from 'mongoose';

/**
 * Submissions Table
 * 
 * Stores all the submissions made to any game.
 */

class SubmissionsItem {
    // Game this submission was made to.
    GameID = "";
    // User having who made the submission.
    UserID = "";
    // Bot sent by the user.
    BotID = "";
    // Date the submission was made.
    SubmissionDate = new Date();
    // List with all the fights.
    FightIDs = <string[]>[];
}

interface SubmissionsDoc extends SubmissionsItem, Document { }

const SubmissionsSchema: Schema = new Schema({
    GameID: { type: String, required: true },
    UserID: { type: String, required: true },
    BotID: { type: String, required: true },
    SubmissionDate: { type: Date, required: true },
    FightIDs: { type: Array, required: true },
});

// Export the model and return your interface
export const SubmissionsModel = mongoose.model<SubmissionsDoc>('Submissions', SubmissionsSchema, 'Submissions');
