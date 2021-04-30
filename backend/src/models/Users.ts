import mongoose, { Schema, Document } from 'mongoose';

/**
 * Users Table
 * 
 * Stores all the users.
 */

class UsersItem {
    // First name of the user.
    FirstName = "";
    // Last name of the user.
    LastName = "";
    // Email of the user.
    Email = "";
    // Username choosen by the user.
    Username = "";
    // Date the user registered.
    DateJoined = new Date();
}

interface UsersDoc extends UsersItem, Document { }

const UsersSchema: Schema = new Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    Username: { type: String, required: true },
    DateJoined: { type: Date, required: true },
});

// Export the model and return your interface
export const UsersModel = mongoose.model<UsersDoc>('Users', UsersSchema, 'Users');
