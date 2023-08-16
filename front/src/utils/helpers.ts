import axios from 'axios';
import { FieldErrorsImpl } from 'react-hook-form';
import { toast } from 'react-toastify';

export const createAxios = (baseURL: string, token?: string | null) => {
    const config = {
        baseURL,
        headers: { 'x-token': `${token}` }
    };
    return axios.create(config);
};

export const displayErrorForm = <H extends Object>(errors: Partial<FieldErrorsImpl<H>>, campo: keyof H, message: any = {}) => {
    switch (errors[campo]?.type) {
        case 'required':
            return errors[campo]?.message;
    }
    return message[errors[campo]?.type] ? message[errors[campo]?.type] : '';
};

export const messageToast = (msg: string, type: string = 'info') => {
    switch (type) {
        case 'success':
            toast.success(msg);
            break;
        case 'error':
            toast.error(msg);
            break;
        case 'warning':
            toast.warning(msg);
            break;
        default:
            toast.info(msg);
            break;
    }
};

export const persistToken = {
    get: () => localStorage.getItem('token'),
    set: (token: string) => localStorage.setItem('token', token),
    clear: () => localStorage.setItem('token', '')
};

export const loadAbort = () => {
    const controller = new AbortController();
    return controller;
};
