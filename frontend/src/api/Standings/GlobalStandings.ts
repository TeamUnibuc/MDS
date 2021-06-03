import { StandingsEntry } from '../Models'

interface GlobalStandingsParameters {
    requested_entries : number,
    requested_offset : number,
    order_by?: string,
    result_order?: string,
}

export interface GlobalStandingsResults {
    entries_found: number,
    entries_returned: number,

    entries: Array<StandingsEntry>
}

export const GlobalStandings = async (reqBody : GlobalStandingsParameters) : Promise<GlobalStandingsResults> => {
    const data = await fetch('api/Standings/Global', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}