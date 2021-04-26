import bots, { Bot } from './components/bots';
import games, { Games } from './components/games';
import users, { User } from './components/users';

const api = {
    bots,
    games,
    users
};

export default api;

export type { Bot, Games, User };