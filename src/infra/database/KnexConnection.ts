import knex from 'knex'
import Connection from './Connection';
import { development } from './configKnex'

export default class KnexConnection implements Connection {
    knex: any;

    constructor() {
        this.knex =  knex(development);
        }
    
    async query(statement: string, params: any): Promise<any> {
        try {
        return await this.knex.raw(statement, params.toString());
        } catch(error) {
            console.log({ 'query': error })
        }
    }
    
    async save(statement: string, params: any): Promise<any> {
        try {
        return await this.knex(`${statement}`).insert(params);
        } catch(error) {
            console.log({ 'save': error })
        }
    }
}
