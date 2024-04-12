export type APIResponse<T> = APIResponseNoError<T> | APIResponseError;


export type APIResponseNoError<T> = {
    command: string;
    rowCount: number;
    oid: number;
    rows: T[];
    fields: [
        {
            name: string;
            tableID: number;
            columnID: number;
            dataTypeID: number;
            dataTypeSize: number;
            dataTypeModifier: number;
            format: string;
        }
    ];
    rowAsArray: boolean;
}

export type APIResponseError = {
    status: number;
    error: string;
}