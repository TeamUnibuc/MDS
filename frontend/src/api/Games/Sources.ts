import { RequestStatus, BotModel } from '../Models'

interface SourceResults extends RequestStatus {
    GameEngine: string,
    OfficialGameBots: Array<BotModel>
}

export const Sources = async (reqBody : {GameID: string}) : Promise<SourceResults> => {
    const data = await fetch('/api/Games/Sources', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}