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
    // ID of the user.
    UserID = "";
    // List of Providers the user with this email connected.
    Providers = {
        googleID : "",
        facebookID : "",
        twitterID : "",
        githubID : "",
    };
    // Exists if the user is an administrator.
    IsAdministrator ?: boolean = false;
}

export interface UsersDoc extends UsersItem, Document { }

interface IUsersModel extends mongoose.Model<UsersDoc>
{
    /**
     * Return UsersDoc if query successfull and user found
     * If user is not found returns null and promise is reesolved successfully
     * You MUST catch to see why query didn't work (doesnt matter if user exists), 
     *   (otherwise, if it fails, app crashes)
     * @param email Email of the user you want to receive back
     * @returns UsersDoc | null  representing the document in MongoDB for the user
     */
    findByEmail(email: string): Promise<UsersDoc | null>
}

const UsersSchema: Schema<UsersDoc> = new Schema<UsersDoc>({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Username: { type: String, required: false, unique: true },
    DateJoined: { type: Date, required: true },
    Providers: {
        required: true,
        type: new Schema(({
            googleID: { type: String },
            facebookID: { type: String },
            twitterID: { type: String },
            githubID: { type: String },
        })),
    },
    IsAdministrator: { type: Boolean, required: false },
});

UsersSchema.statics.findByEmail = function(email: string)
{
    return this.findOne({Email: email}).exec()
        .catch(err => {
            const msg = `Error querying DB for user with email: ${email} || ${err}`
            console.log(msg)
            throw new Error(msg)
        })
}

// Export the model and return your interface
export const UsersModel: IUsersModel = mongoose.model<UsersDoc, IUsersModel>('Users', UsersSchema, 'Users');

// When writing an express endpoint, (req, res) => ...
// The req object will have the req.user object types as extending UsersDoc
//   to have autocomplete and please the TS language
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        export interface User extends UsersDoc {
            UserID: string;
        }
    }
}
