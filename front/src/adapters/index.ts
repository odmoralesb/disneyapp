import { IResponse } from '../models/model.axios';

export const setResponseAdapter = <T extends Object>(response: IResponse<T>) => ({
    payload: response.payload,
    messages: response?.messages,
    errors: response?.errors
});

export default setResponseAdapter;
