import knex from 'knex'
import Connection from './Connection';
import { development } from './configKnex'

export default class KnexConnection implements Connection {
    knex: any;

    constructor() {
        this.knex =  this.init();
        }

    private init() {
        return knex(development);
    }
    
    async query(statement: string, params: any): Promise<any> {
        try {
        return await this.knex.raw(statement, params.toString());
        } catch(error) {
            console.log({ 'query': error })
        }
    }
    
    async save(tableName: string, params: any): Promise<any> {
        try {
        return await this.knex(`${tableName}`).insert(params);
        } catch(error) {
            console.log({ 'save': error })
        }
    }

    async close(): Promise<void> {
        await this.knex.destroy();
    }
}
