import { Navigate, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { lazy } from 'react';

import { PrivateRoutes, Role } from '../../models';

import { RouteNotFound } from '../../components';

// Guards
import { AuthGuard } from '../../guards';

// Pages
import { Home } from './Home';
import { Movies } from './Movies';
import { Characters } from './Characters';

//lazy loading - layouts
const Layout = lazy(() => import('../../components/Layout/Navbar'));

export const Dashboard = () => {
    return (
        <RouteNotFound>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={`/${PrivateRoutes.MOVIES}`} element={<Movies />} />
                <Route path={`/${PrivateRoutes.CHARACTERS}`} element={<Characters />} />
            </Route>
        </RouteNotFound>
    );
};

export default Dashboard;
