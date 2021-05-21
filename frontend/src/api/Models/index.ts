export interface GameModel{
    game_id: string,
    title: string,
    statement: string,
    game_engine: string,
    author_id: string,
    official_bots?: Array<string>,
}
