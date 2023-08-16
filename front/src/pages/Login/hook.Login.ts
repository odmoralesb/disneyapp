import { PublicRoutes } from './../../models/model.routes';
// libraries
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

// models
import { TLogin } from './model.Login';
import { IResponseLogin, Role } from '../../models';
import { PrivateRoutes } from '../../models/model.routes';

// states - redux
import { resetUser, setUser } from '../../redux/states/state.user';

//services
import { login } from '../../services/service.auth';

// adapters
import setResponseAdapter from '../../adapters';
import * as AdapterUser from '../../adapters/adapter.user';

// custom Hooks
import { useFetch } from '../../hooks/fetch';
import { useDisplayMessages } from '../../hooks/messages';
import { useEffect } from 'react';

export const usePageLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TLogin>();

    const { callEndpoint } = useFetch();
    const { displayErrors } = useDisplayMessages();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onSubmit = async (data: TLogin) => {


        const resp = setResponseAdapter<IResponseLogin>((await callEndpoint(login(data.nombreusuario, data.clave))).data);

        

        const { errors } = resp;

        if (!!errors) {
            displayErrors(errors);
            return;
        }

        const { usuario, token } = AdapterUser.setPayloadLogin(resp.payload);

        if (token && usuario) {
            dispatch(setUser(AdapterUser.setState(usuario, token as string)));
            switch (usuario.rol?.nombre) {
                case Role.ADMINDB:
                    navigate(`/${PrivateRoutes.CREATEADMINSU}`, { replace: true });
                    break;
                default:
                    navigate(`/${PrivateRoutes.DASHBOARD}`, { replace: true });
                    break;
            }
        } else {
            navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
        }
    };

    useEffect(() => {
        dispatch(resetUser());
        navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    }, []);

    return {
        register,
        handleSubmit,
        onSubmit,
        errors
    };
};

export default usePageLogin;
