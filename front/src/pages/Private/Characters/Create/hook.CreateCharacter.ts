// libraries
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

// models
import { TCreateCharacter } from './model.CreateCharacter';

//services
import { createcharacter } from '../../../../services/service.character';

// adapters
import { setResponseAdapter } from '../../../../adapters';

// custom Hooks
import { useFetch } from '../../../../hooks/fetch';
import { useDisplayMessages } from '../../../../hooks/messages';
import { PrivateRoutes } from '../../../../models';

// Helpers

export const usePageCreateCharacter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TCreateCharacter>();

    const { displayErrors, displayMessage } = useDisplayMessages();

    const navigate = useNavigate();

    const { callEndpoint } = useFetch();

    const dispatch = useDispatch();

    const onSubmit = async (data: TCreateCharacter) => {
        const { name, age, weight, story } = data;

        const resp = setResponseAdapter((await callEndpoint(createcharacter({ name, age, weight, story }))).data);

        const { errors, messages } = resp;

        if (!!errors) {
            displayErrors(errors);
            return;
        }

        if (!!messages && messages.length > 0) {
            displayMessage(messages[0], 'warning');
        } else {
            displayMessage('Creacion realizado con éxito');
        }

        navigate(`/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.CHARACTERS}`, { replace: true });
    };

    return { register, handleSubmit, onSubmit, errors };
};

export default usePageCreateCharacter;
