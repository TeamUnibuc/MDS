
export interface RequestStatus {
    error_message? : string,
    status: 'ok' | 'fail'
}

export interface GameModel {
    Name: string,
    Description: string,
    GameID: string,
    AuthorID: string,
    AuthorUsername: string,
    Date: Date
}

export interface SubmissionModel {
    Date: Date,
    Score: number,
    GameID: string,
    AuthorID: string,
    AuthorUsername: string,
    SubmissionID: string,
}

export interface BotModel {
    BotID: string,
    BotName: string,
    BotRank: number,
    BotCode: string,
    DateSubmitted: Date,
    AuthorID: string,
    CompilationMessage: string
}

export interface StandingsEntry {
    best_submission_id: string,
    submissions: number,
    Points: number,
    AuthorID: string,
    AuthorUsername: string,
}

export interface AccountModel{
    FirstName: string,
    LastName: string,
    Email: string,
    DateJoined: Date,
    UserID: string
}

export interface UserModel{
    FirstName: string,
    LastName: string,
    DateJoined: Date,
    Email: string
}