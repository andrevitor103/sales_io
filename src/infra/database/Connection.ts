
export default interface Connection {
    query(statement: string, params: any): Promise<any>;
    save(statement: string, params: any): Promise<any>;
}