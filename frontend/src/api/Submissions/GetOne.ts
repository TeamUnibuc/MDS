interface Result{
    logs: string,
    won: boolean
}

interface GetOneResults {
    error_message?: string,
    status: 'ok' | 'fail',
    date: Date,
    score: number,
    game_id: string,
    author_id: string,
    submission_id: string,

    compiled: boolean,
    compilation_message?: string,
    results: Array<Result>,

    finished_evaluation: boolean
}

export const GetOne = async (reqBody : {submission_id: string}) : Promise<GetOneResults> => {
    const data = await fetch('api/Submissions/Details', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}