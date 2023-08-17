// libraries
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

// models
import { TCreateAdminSU } from './model.Register';

// states - redux
import { resetUser } from '../../redux/states';

//services
import { registeruser } from '../../services/service.auth';

// adapters
import { setResponseAdapter } from '../../adapters';

// custom Hooks
import { useFetch } from '../../hooks/fetch';
import { useDisplayMessages } from '../../hooks/messages';

// Helpers

export const usePageRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TCreateAdminSU>();

    const { displayErrors, displayMessage } = useDisplayMessages();

    const navigate = useNavigate();

    const { callEndpoint } = useFetch();

    const dispatch = useDispatch();

    const onSubmit = async (data: TCreateAdminSU) => {
        const { nombreusuario, nombres, apellidos, clave, confirm } = data;

        if (clave != confirm) {
            displayErrors(['Confirme su contraseña']);
            return;
        }

        const resp = setResponseAdapter((await callEndpoint(registeruser({ nombreusuario, nombres, apellidos, clave }))).data);

        const { errors, messages } = resp;

        if (!!errors) {
            displayErrors(errors);
            return;
        }

        if (!!messages && messages.length > 0) {
            displayMessage(messages[0], 'warning');
        } else {
            displayMessage('Actualización realizado con éxito');
        }

        dispatch(resetUser());
        navigate('/', { replace: true });
    };

    return { register, handleSubmit, onSubmit, errors };
};

export default usePageRegister;
