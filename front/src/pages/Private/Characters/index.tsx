import { Route } from 'react-router';

import { RouteNotFound } from '../../../components';

import { MasterCharacters } from './master.Characters';
import { Characters } from './index.Characters';
import { CreateCharacter } from './Create/create.Character';

import { PrivateRoutes } from '../../../models';

export const Routes = () => {
    return (
        <RouteNotFound>
            <Route path="/" element={<MasterCharacters />}>
                <Route index element={<Characters />} />
                <Route path={`/${PrivateRoutes.CREATECHARACTER}`} element={<CreateCharacter />} />
            </Route>
        </RouteNotFound>
    );
};

export default Routes;
