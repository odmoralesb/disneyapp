import { Route } from 'react-router';

import { RouteNotFound } from '../../../components';

import { MasterCharacters } from './master.Characters';
import { Characters } from './index.Characters';

export const Routes = () => {
    return (
        <RouteNotFound>
            <Route path="/" element={<MasterCharacters />}>
                <Route index element={<Characters />} />
            </Route>
        </RouteNotFound>
    );
};

export default Routes;
