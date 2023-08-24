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

    const formData = new FormData();
    formData.append('name', request.name);
    formData.append('age', request.age);
    formData.append('weight', request.weight);
    request.story && formData.append('story', request.story);
    formData.append('image', request.image);

    return {
        call: axios.post<IPersonajeData>('/characters', formData, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};

export const getCharacter = (id: string) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    return {
        call: axios.get<IPersonajeData>(`/characters/${id}`, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};

export const updateCharacter = (id: string, request: Request.IRequestUpdateCharacter) => {
    const controller = loadAbort();
    const token: string | null = persistToken.get();
    const axios = createAxios(config.API_URL, token);
    console.log('# request::', request);
    return {
        call: axios.put<IPersonajeData>(`/characters/${id}`, request, { signal: controller.signal }).catch((e) => {
            return e.response;
        }),
        controller
    };
};
