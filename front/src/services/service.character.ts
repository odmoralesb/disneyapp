import config from '../config';

import { IPersonajeData } from '../models';

import { loadAbort, createAxios } from '../utils';
import { persistToken } from '../utils/helpers';

import * as Request from '../models/model.requests';

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

export const createcharacter = (request: Request.IRequestCreateCharacter) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.post<IPersonajeData>('/characters', request, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};
