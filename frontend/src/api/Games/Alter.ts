import { GameModel } from '../Models';


export const Alter = async (reqBody : GameModel) : Promise<void> => {
    const data = await fetch('api/games/Alter', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}