import { Bot } from '../api'

export interface Games {
    _id: string,
    Name: string,
    Description: string,
    GameEngine: string,
    OfficialGameBots: Array<Bot>
}

const getGames = async () => {
    const data = await fetch('/api/games', {
        method: 'GET', headers: {'Content-Type': 'application/json'}
    });
    const content = await data.json();
    return content.games;
}

export default { getGames }