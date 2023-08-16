import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { IAppStore } from '../redux/store';

import { PublicRoutes } from '../models/model.routes';
import { Role } from '../models/model.user';

interface IProps {
    roles?: Role[];
}

export const AuthGuard = ({ roles }: IProps) => {
    const userState = useSelector((store: IAppStore) => store.usuario);

    const userRole = userState.rol as Role;

    switch (userRole) {
        case Role.ADMINDB:
            return roles?.includes(userRole) ? <Outlet /> : <Navigate replace to={`/${PublicRoutes.LOGIN}`} />;
        default:
            if (roles) {
                return userState.nombreusuario && roles.includes(userRole) ? <Outlet /> : <Navigate replace to={`/${PublicRoutes.LOGIN}`} />;
            } else {
                return userState.nombreusuario ? <Outlet /> : <Navigate replace to={`/${PublicRoutes.LOGIN}`} />;
            }
    }
};

export default AuthGuard;
