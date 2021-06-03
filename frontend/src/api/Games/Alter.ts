import { RequestStatus } from '../Models';

interface BotParameters {
    BotName: string,
    BotCode: string
}

interface AlterParameters {
    Name: string,
    Description: string,
    GameID?: string,
    AuthorID: string,
    GameEngine: string,
    OfficialGameBots: Array<BotParameters>
}

interface AlterResults extends RequestStatus {
    GameID? : string,
}

export const Alter = async (reqBody : AlterParameters) : Promise<AlterResults> => {
    const data = await fetch('/api/Games/Alter', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}