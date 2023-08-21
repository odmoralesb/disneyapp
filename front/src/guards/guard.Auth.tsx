import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { IAppStore } from '../redux/store';

import { PublicRoutes } from '../models/model.routes';
import { Role } from '../models/model.user';

interface IProps {
    roles?: Role[];
}

export const AuthGuard = ({ roles }: IProps) => {
    const userState = useSelector((store: IAppStore) => store.user);

    const userRole = userState.role as Role;

    switch (userRole) {
        case Role.ADMINDB:
            return roles?.includes(userRole) ? <Outlet /> : <Navigate replace to={`/${PublicRoutes.LOGIN}`} />;
        default:
            if (roles) {
                return userState.username && roles.includes(userRole) ? <Outlet /> : <Navigate replace to={`/${PublicRoutes.LOGIN}`} />;
            } else {
                return userState.username ? <Outlet /> : <Navigate replace to={`/${PublicRoutes.LOGIN}`} />;
            }
    }
};

export default AuthGuard;
