import { RequestStatus } from '../Models'

interface UserProblemParameters {
    GameID: string,
    UserID: string,
}

interface UserProblemResults extends RequestStatus {
    has_submissions: boolean,
    submissions_count?: number,
    rank?: number,
    best_submission_id?: string,
    submissionIDs: Array<string>
}

export const UserGameStandings = async (reqBody : UserProblemParameters) : Promise<UserProblemResults> => {
    const data = await fetch('api/Standings/UserStatsGame', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}