import config from '../config';

import * as Request from '../models/model.requests';

import { IUserData } from '../models';

import { loadAbort, createAxios } from '../utils';
import { persistToken } from '../utils/helpers';

export const createadminsu = (request: Request.IRequestCreateAdmin) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.post<IUserData>('/users/su', request, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};


export const createadmin = (request: Request.IRequestCreateAdmin) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.post<IUserData>('/administrators', request, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};

export const getAdministrator = (username: string) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.get<IUserData>(`/administrators/${username}`, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};

export const updateAdministrator = (username: string, request: Request.IRequestUpdateAdmin) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.put<IUserData>(`/administrators/${username}`, request, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};

export const deleteAdministrator = (username: string) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.delete<IUserData>(`/administrators/${username}`, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};
