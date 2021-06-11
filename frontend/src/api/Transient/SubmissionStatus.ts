import { RequestStatus } from 'api/Models';

interface TransientSubParameters {
    SubmissionID: string
}

export interface TrFight
{
    Status: 'unknown' | 'won' | 'lost' | 'error',
    AgainstID: string,
}

interface TransientSubResults extends RequestStatus {
    SubmissionID?: string
    fights: TrFight[],
    totalFights: number,
}

export const SubmissionStatus = async (reqBody: TransientSubParameters) : Promise<TransientSubResults> => {
    const data = await fetch('/api/Transient/SubmissionStatus', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}
