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
    date: Date,
    score: number,
    game_id: string,
    author_id: string,
    author_username: string,
    submission_id: string,
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