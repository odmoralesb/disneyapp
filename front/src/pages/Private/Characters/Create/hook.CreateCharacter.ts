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
import { useState } from 'react';

// Helpers

export const usePageCreateCharacter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TCreateCharacter>();

    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string>();

    const { displayErrors, displayMessage } = useDisplayMessages();

    const navigate = useNavigate();

    const { callEndpoint } = useFetch();

    const dispatch = useDispatch();

    const onSubmit = async (data: TCreateCharacter) => {
        const { name, age, weight, story, image } = data;

        console.log('# data file: ', data);

        const resp = setResponseAdapter((await callEndpoint(createcharacter({ name, age, weight, story, image: image[0] }))).data);

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

    const onSelectFile = (target: HTMLInputElement) => {
        if (!target.files || target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(target.files[0]);
    };

    return { register, handleSubmit, onSubmit, errors, selectedFile, setSelectedFile, preview, setPreview, onSelectFile };
};

export default usePageCreateCharacter;
