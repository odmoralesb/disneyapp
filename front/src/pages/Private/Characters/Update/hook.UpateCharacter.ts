// libraries
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';

// models
import { IRequestUpdateCharacter } from '../../../../models/model.requests';
import { TCreateCharacter } from './model.UpdateCharacter';
import { IPersonajeData, IResponsePersonaje } from '../../../../models/model.responses';

//services
import { getCharacter, updateCharacter } from '../../../../services/service.character';

// adapters
import { setResponseAdapter } from '../../../../adapters';
import * as AdapterCharacter from '../../../../adapters/adapter.character';

// custom Hooks
import { useFetch } from '../../../../hooks/fetch';
import { useDisplayMessages } from '../../../../hooks/messages';
import { PrivateRoutes } from '../../../../models';
import { useEffect, useState } from 'react';

// Helpers

export const usePageCreateCharacter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        unregister
    } = useForm<TCreateCharacter>();

    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [character, setCharacter] = useState<IPersonajeData>();

    const { displayErrors, displayMessage } = useDisplayMessages();

    const navigate = useNavigate();

    const { callEndpoint } = useFetch();

    const dispatch = useDispatch();

    const { id } = useParams();

    const onLoadCharacter = async () => {
        return setResponseAdapter<IResponsePersonaje>((await callEndpoint(getCharacter(id as string)))?.data);
    };

    const onSubmit = async (request: IRequestUpdateCharacter) => {
        const resp = setResponseAdapter((await callEndpoint(updateCharacter(id as string, request))).data);

        const { errors } = resp;

        if (!!errors) {
            displayErrors(errors);
            return;
        }

        displayMessage('Actualizacion realizada con exito');

        navigate(`/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.CHARACTERS}`, { replace: true });
    };

    const onSelectFile = (target: HTMLInputElement) => {
        if (!target.files || target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(target.files[0]);
    };

    useEffect(() => {
        onLoadCharacter()
            .then((data) => {
                const { errors } = data;
                if (!!errors) {
                    displayErrors(errors);
                    return;
                }
                setCharacter(AdapterCharacter.setPayloadCharacter(data.payload).character);

                unregister('name');
                unregister('age');
                unregister('weight');
                unregister('story');
            })
            .catch((e) => {
                console.error(e);
            });

        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    return { register, handleSubmit, onSubmit, errors, selectedFile, setSelectedFile, preview, setPreview, onSelectFile, character };
};

export default usePageCreateCharacter;
