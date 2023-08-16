import { configureStore } from '@reduxjs/toolkit';
import { IUserState } from '../models';
import { userSlice } from './states';

export interface IAppStore {
    usuario: IUserState;
}

export default configureStore<IAppStore>({
    reducer: {
        usuario: userSlice.reducer
    }
});
