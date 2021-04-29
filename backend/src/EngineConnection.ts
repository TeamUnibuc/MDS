/* eslint-disable @typescript-eslint/no-explicit-any */
import zerorpc from 'zerorpc'

export class EngineConnection {
    private static instance: undefined | EngineConnection;

    private client: any;

    private constructor() {
        this.client = new zerorpc.Client();
        this.client.connect("tcp://127.0.0.1:4242");
    }

    private static GetInstance() {
        if (this.instance === undefined)
            this.instance = new EngineConnection();
        return this.instance;
    }

    // private static async FightCallback(obj_str: string, callback: Function):  

    public static Fight(engine: string, bots: Array<string>): Promise<any> {
        const client = this.GetInstance().client;

        const obj = {
            engine: engine,
            bots: bots
        };
        const obj_string = JSON.stringify(obj);
        
        const my_promise: Promise<string> = new Promise((resolve) => {
            client.invoke("StartSimulation", obj_string, function(err: string, result: string) {
                result = JSON.parse(result)
                resolve(result);
            });
        });

        return my_promise;
    }

    public static CloseConnection(): void {
        if (this.instance !== undefined) {
            this.instance.client.close();
            this.instance = undefined;
        }
    }
}
