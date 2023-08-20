// libraries
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

// models
import { TRegister } from './model.Register';

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
    } = useForm<TRegister>();

    const { displayErrors, displayMessage } = useDisplayMessages();

    const navigate = useNavigate();

    const { callEndpoint } = useFetch();

    const dispatch = useDispatch();

    const onSubmit = async (data: TRegister) => {
        const { username, firstname, lastname, password, confirm } = data;

        if (password != confirm) {
            displayErrors(['Confirme su contraseña']);
            return;
        }

        const resp = setResponseAdapter((await callEndpoint(registeruser({ username, firstname, lastname, password }))).data);

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
