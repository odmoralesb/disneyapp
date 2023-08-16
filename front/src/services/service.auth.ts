import config from '../config';

import { IUserData } from '../models';
import { loadAbort, createAxios } from '../utils';

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
