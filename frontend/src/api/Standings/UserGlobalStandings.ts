
interface UserGlobalParameters {
    UserID: string,
}

interface UserGlobalResults {
    submissions?: number,
    TotalBotsBeaten: number,
    TotalPoints: number,
    rank?: number
}

export const UserGlobalStandings = async (reqBody : UserGlobalParameters) : Promise<UserGlobalResults> => {
    const data = await fetch('/api/Standings/UserStatsGlobal', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}