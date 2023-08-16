import { Provider } from 'react-redux';
import { Suspense, lazy } from 'react';

import { PublicRoutes, PrivateRoutes, Role } from './models';

import { BrowserRouter, Navigate, Route } from 'react-router-dom';

import store from './redux/store';

// Pages

// Components
import { RouteNotFound } from './components';

// Guards
import { AuthGuard } from './guards';

//lazy loading
const Login = lazy(() => import('./pages/Login/page.Login'));
const Register = lazy(() => import('./pages/Register/page.Register'));
const Dashboard = lazy(() => import('./pages/Private/page.Dashboard'));
const CreateAdminSU = lazy(() => import('./pages/Private/CreateAdminSU/page.CreateAdminSU'));

const App = () => {
    return (
        <Suspense fallback={<>Cargando...</>}>
            <Provider store={store}>
                <BrowserRouter>
                    <RouteNotFound>
                        <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
                        <Route path={PublicRoutes.LOGIN} element={<Login />} />
                        <Route path={PublicRoutes.REGISTER} element={<Register />} />
                        <Route element={<AuthGuard roles={[Role.ADMINDB]} />}>
                            <Route path={`/${PrivateRoutes.CREATEADMINSU}`} element={<CreateAdminSU />} />
                        </Route>
                        <Route element={<AuthGuard />}>
                            <Route path={`${PrivateRoutes.DASHBOARD}/*`} element={<Dashboard />} />
                        </Route>
                    </RouteNotFound>
                </BrowserRouter>
            </Provider>
        </Suspense>
    );
};

export default App;
