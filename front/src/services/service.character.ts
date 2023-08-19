import config from '../config';

import { IPersonajeData } from '../models';

import { loadAbort, createAxios } from '../utils';
import { persistToken } from '../utils/helpers';

export const getCharacters = (name?: string, age?: number) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.get<IPersonajeData[]>(`/characters?${name ? '&name=' + name : ''}${age ? '&age=' + age : ''}`).catch((e) => {
            return e.response;
        }),
        controller
    };
};
