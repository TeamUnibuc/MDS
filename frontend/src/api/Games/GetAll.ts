import { GameModel } from '../Models'

interface GetAllParameters {
    requested_games : number,
    requested_offset : number,
    order_by?: string,
    result_order?: string,
}
interface GetAllResults {
    games_found: number,
    games_returned: number,
    games: Array<GameModel>
}

export const GetAll = async (reqBody : GetAllParameters) : Promise<GetAllResults> => {
    const data = await fetch('/api/Games/GetAll', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}