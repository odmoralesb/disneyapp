import config from '../config';

import { IUserData } from '../models';
import * as Request from '../models/model.requests';

import { loadAbort, createAxios } from '../utils';
import { persistToken } from '../utils/helpers';

export const login = (nombreusuario: string, clave: string) => {
    const controller = loadAbort();
    const axios = createAxios(config.API_URL);
    return {
        call: axios.post<IUserData>('/auth/login', { nombreusuario, clave }, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};

export const signin = (token: string) => {
    const axios = createAxios(config.API_URL);
    return {
        call: axios
            .post<IUserData>('/auth/signin', { token })
            .then((resp) => resp.data)
            .catch((e) => {
                return e.response.data;
            })
    };
};

export const registeruser = (request: Request.IRequestRegister) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.post<IUserData>('/auth/register', request, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};
