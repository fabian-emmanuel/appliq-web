// map HTTP status codes to friendly messages
export const errorMessages: Record<number, string> = {
    401: 'Authentication required. Please log in.',
    403: 'Permission denied.',
    404: 'Resource not found.',
    422: 'Validation error. Check your input.',
    429: 'Too many requests. Please try later.',
};

export class HttpError extends Error {
    public response: Response;
    public status: number;
    public name: string;

    constructor(response: Response, message?: string) {
        super(message || `HTTP Error ${response.status}`);
        this.response = response;
        this.status = response.status;
        this.name = `HttpError${response.status}`;
    }
}

export class NetworkError extends Error {
    public originalError: Error;

    constructor(originalError: Error) {
        super('Network error. Please check your connection and try again.');
        this.originalError = originalError;
        this.name = 'NetworkError';
    }
}