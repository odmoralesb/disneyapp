import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { IAppStore } from '../redux/store';

import { Role } from '../models/model.user';

interface IProps {
    roles?: Role[];
}

export const RoleGuard = ({ roles }: IProps) => {
    const userState = useSelector((store: IAppStore) => store.user);
    const userRole = userState.role as Role;
    return roles?.includes(userRole) ? <Outlet /> : <Navigate to={`/`} />;
};

export default RoleGuard;
