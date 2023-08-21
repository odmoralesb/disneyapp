// libraries
import React from 'react';
import { TextField, Button } from '@mui/material';

// models
import { TCreateCharacter } from './model.CreateCharacter';

// custom hooks
import useCreateCharacter from './hook.CreateCharacter';

// helpers
import { displayErrorForm } from '../../../../utils/helpers';

import { PrivateRoutes } from '../../../../models';

export const CreateCharacter = () => {
    const { register, handleSubmit, onSubmit, errors } = useCreateCharacter();
    return (
        <>
            <form>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Nombre del Personaje"
                    {...register('name', { required: 'El nombre del personaje es requerido' })}
                />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'name')}</div>

                <TextField
                    margin="normal"
                    fullWidth
                    label="Edad"
                    type="number"
                    {...register('age', { required: 'La edad es requerida' })}
                />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'age')}</div>

                <TextField
                    margin="normal"
                    fullWidth
                    label="Peso"
                    type="number"
                    {...register('weight', { required: 'El apellido es requerido' })}
                />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'weight')}</div>

                <TextField margin="normal" fullWidth label="Historia" {...register('story')} />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'story')}</div>

                <Button fullWidth variant="contained" color="primary" onClick={handleSubmit((data) => onSubmit(data))}>
                    Aceptar
                </Button>
                <br />
                <br />
                <Button fullWidth variant="contained" color="secondary">
                    <a
                        style={{ textDecoration: 'none', color: '#FFFFFF' }}
                        href={`/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.CHARACTERS}`}
                    >
                        Cancelar
                    </a>
                </Button>
            </form>
        </>
    );
};

export default CreateCharacter;
