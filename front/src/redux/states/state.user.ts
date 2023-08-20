import { createSlice } from '@reduxjs/toolkit';

import { IUserState, IUserData } from '../../models';

import { signin } from '../../services/service.auth';

import * as AdapterUser from '../../adapters/adapter.user';

import { persistToken } from '../../utils/helpers';

const INITIAL_STATE: IUserState = {
    username: '',
    firstname: '',
    lastname: '',
    role: '',
    is_superuser: false,
    token: ''
};

const loadInitialState = async (): Promise<IUserState> => {
    const token = persistToken.get();

    if (!token) {
        return INITIAL_STATE;
    }

    const { payload, errors } = await signin(token).call;

    if (errors) {
        return INITIAL_STATE;
    }

    if (!payload || !payload.user) {
        return INITIAL_STATE;
    }

    return AdapterUser.setState(payload.user, token as string);
};

export const userSlice = createSlice({
    name: 'user',
    initialState: await loadInitialState(),
    reducers: {
        setUser: (state, action) => {
            persistToken.set(action.payload.token);
            return action.payload;
        },
        updateUser: (state, action) => {
            persistToken.set(action.payload.token);
            return { ...state, ...action.payload };
        },
        resetUser: () => {
            persistToken.clear();
            return INITIAL_STATE;
        }
    }
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice;
