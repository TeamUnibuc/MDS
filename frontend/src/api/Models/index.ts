export interface RequestStatus {
    error_message? : string,
    status: 'ok' | 'fail'
}

export interface GameModel {
    Name: string,
    Description: string,
    GameID: string,
    AuthorID: string,
    AuthorUsername: string
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