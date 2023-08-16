import { AxiosResponse } from 'axios';

export interface AxiosCall<T> {
    call: Promise<AxiosResponse<T>>;
    controller?: AbortController;
}

export interface IResponse<T> {
    payload: T;
    messages?: string[];
    errors?: string[];
}
