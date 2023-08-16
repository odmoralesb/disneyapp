import { useNavigate } from 'react-router';
import { PublicRoutes } from '../../../models';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../redux/states';

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    };
    return (
        <li>
            <a className="dropdown-item" onClick={logOut} href="#">
                Cerrar sesión
            </a>
        </li>
    );
};

export default Logout;
