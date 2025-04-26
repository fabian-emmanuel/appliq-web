
//types
export type QueryParamsType = Record<string | number, any>;

export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export type CancelToken = symbol | string | number;


//enums
export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}


//interfaces
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    secure?: boolean;
    path: string;
    type?: ContentType;
    query?: QueryParamsType;
    format?: ResponseFormat;
    body?: unknown;
    baseUrl?: string;
    cancelToken?: CancelToken;
}

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D = unknown, E = unknown> extends Response {
    data: D;
    error: E;
}