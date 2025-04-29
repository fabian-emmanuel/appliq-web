import {
    FullRequestParams,
    QueryParamsType,
    ResponseFormat,
    ContentType,
    RequestParams,
    ApiConfig,
    HttpResponse
} from '@/types/http-client';
import {errorMessages, HttpError, NetworkError} from '@/errors/http-client-errors';

export class HttpClient<SecData = unknown> {
    private readonly baseUrl: string;
    private readonly securityWorker?: ApiConfig<SecData>['securityWorker'];
    private securityData: SecData | null = null;
    private readonly fetchFn: typeof fetch;
    private abortControllers = new Map<symbol | string | number, AbortController>();

    private readonly defaultParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    constructor(config: ApiConfig<SecData> = {}) {
        this.baseUrl = config.baseUrl ?? '';
        this.securityWorker = config.securityWorker;
        this.fetchFn = config.customFetch ?? window.fetch.bind(window);
        if (config.baseApiParams) {
            this.defaultParams = { ...this.defaultParams, ...config.baseApiParams };
        }
    }

    setSecurityData(data: SecData | null) {
        this.securityData = data;
    }

    // Build ?a=1&b=2 array-friendly
    private buildQuery(q?: QueryParamsType): string {
        if (!q) return '';
        const p = new URLSearchParams();
        Object.entries(q).forEach(([k, v]) => {
            if (v == null) return;
            if (Array.isArray(v)) v.forEach(item => p.append(k, String(item)));
            else p.append(k, String(v));
        });
        const s = p.toString();
        return s ? `?${s}` : '';
    }

    // Format body based on ContentType
    private formatBody(body: any, type: ContentType): BodyInit {
        switch (type) {
            case ContentType.Json:
                return JSON.stringify(body);
            case ContentType.UrlEncoded:
                return new URLSearchParams(body).toString();
            case ContentType.FormData: {
                const fd = new FormData();
                Object.entries(body || {}).forEach(([k, v]) => {
                    if (Array.isArray(v)) {
                        v.forEach(item => this.appendForm(fd, k, item));
                    } else {
                        this.appendForm(fd, k, v);
                    }
                });
                return fd;
            }
            case ContentType.Text:
                return typeof body === 'string' ? body : JSON.stringify(body);
        }
    }

    private appendForm(fd: FormData, key: string, value: any) {
        if (value instanceof Blob) fd.append(key, value);
        else if (typeof value === 'object') fd.append(key, JSON.stringify(value));
        else fd.append(key, String(value));
    }

    // Parse add throw on non-ok
    private async handleResponse<T, E>(
        res: Response,
        format: ResponseFormat
    ): Promise<T> {
        const data = await res[format]();
        if (res.ok) return data as T;
        const msg = errorMessages[res.status] ?? `HTTP Error ${res.status}`;
        throw new HttpError(res, msg);
    }

    public async request<T = any, E = any>(
        params: FullRequestParams
    ): Promise<HttpResponse<T, E>> {
        const {
            secure,
            path,
            query,
            body,
            type = ContentType.Json,
            format = 'json' as ResponseFormat,
            baseUrl,
            cancelToken,
            ...userParams
        } = params;

        // 1) Security
        let securityParams: RequestParams = {};
        if (secure && this.securityData && this.securityWorker) {
            const result = await this.securityWorker(this.securityData);
            if (result) securityParams = result;
        }

        // 2) Build URL + params
        const url = `${baseUrl ?? this.baseUrl}${path}${this.buildQuery(query)}`;
        const merged = {
            ...this.defaultParams,
            ...securityParams,
            ...userParams,
        };
        const headers = { ...merged.headers };
        if (type !== ContentType.FormData) {
            headers['Content-Type'] = type;
        }

        // 3) Abort handling
        if (cancelToken != null) {
            const ctr = new AbortController();
            this.abortControllers.set(cancelToken, ctr);
            merged.signal = ctr.signal;
        }

        const init: RequestInit = {
            ...merged,
            method: merged.method ?? 'GET',
            headers,
            body: body != null ? this.formatBody(body, type) : undefined,
        };

        // 4) Fetch + handle errors
        let res: Response;
        try {
            res = await this.fetchFn(url, init);
        } catch (err) {
            console.error("ERROR::", err);
            throw new NetworkError(err as Error);
        } finally {
            if (cancelToken != null) {
                this.abortControllers.delete(cancelToken);
            }
        }

        const data = await this.handleResponse<T, E>(res, format);
        return Object.assign(res, { data, error: undefined });
    }
}