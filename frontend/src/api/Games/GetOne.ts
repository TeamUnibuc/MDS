import { GameModel } from '../Models'

interface GetOneResults {
    error_message?: string,
    status: 'ok' | 'fail',
    game: GameModel
}

export const GetOne = async (reqBody : {GameID: string}) : Promise<GetOneResults> => {
    const data = await fetch('api/Games/GetGame', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}