import { configureStore } from '@reduxjs/toolkit';
import { IUserState } from '../models';
import { userSlice } from './states';

export interface IAppStore {
    user: IUserState;
}

export default configureStore<IAppStore>({
    reducer: {
        user: userSlice.reducer
    }
});
