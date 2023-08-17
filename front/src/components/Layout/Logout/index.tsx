import { useNavigate } from 'react-router';
import { PublicRoutes } from '../../../models';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../redux/states';

import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Person';
import ListItemText from '@mui/material/ListItemText';

import { useSelector } from 'react-redux';

import { IAppStore } from '../../../redux/store';

export const Logout = () => {
    const userState = useSelector((store: IAppStore) => store.usuario);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    };
    return (
        <IconButton color="inherit">
            <LockIcon onClick={logOut} />
        </IconButton>
    );
};

export default Logout;
