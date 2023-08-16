import { useNavigate } from 'react-router';
import { PublicRoutes } from '../../../models';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../redux/states';

import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from '@mui/material/ListItemText';

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    };
    return (
        <IconButton color="inherit">
            <PersonIcon onClick={logOut} />
        </IconButton>
    );
};

export default Logout;
