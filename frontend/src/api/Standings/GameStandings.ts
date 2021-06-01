import { StandingsEntry } from '../Models'

interface GameStandingsParameters {
    requested_entries : number,
    requested_offset : number,
    GameID?: string,
    order_by: string,
    result_order: string,
}

interface GameStandingsResults  {
    entries_found: number,
    entries_returned: number,

    entries: Array<StandingsEntry>
}

export const GameStandings = async (reqBody : GameStandingsParameters) : Promise<GameStandingsResults> => {
    const data = await fetch('api/Standings/GameStandings', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}