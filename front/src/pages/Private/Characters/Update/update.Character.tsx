import config from '../../../../config';

// libraries
import React, { useEffect } from 'react';
import { TextField, Button } from '@mui/material';

// models
import { TCreateCharacter } from './model.UpdateCharacter';

// custom hooks
import useCreateCharacter from './hook.UpateCharacter';

// helpers
import { displayErrorForm } from '../../../../utils/helpers';

import { PrivateRoutes } from '../../../../models';

export const UpdateCharacter = () => {
    const { register, handleSubmit, onSubmit, errors, selectedFile, setSelectedFile, preview, setPreview, onSelectFile, character } =
        useCreateCharacter();

    console.log('# character: ', character);

    return (
        <>
            <form style={{ width: '50%', margin: '0 auto 0 auto' }}>
                <div
                    style={{
                        width: '100%',
                        height: '100px',
                        textAlign: 'center',
                        marginTop: '10px'
                    }}
                >
                    <div style={{ border: '1px dotted black', paddingTop: '7px' }}>
                        <img src={`${config.DIR_STL}${character?.image?.path}`} width={100} height={100} />
                    </div>
                </div>

                <br />

                <TextField
                    sx={{ marginTop: '15px' }}
                    margin="normal"
                    fullWidth
                    label="Nombre del Personaje"
                    focused
                    {...register('name', { required: 'El nombre del personaje es requerido', value: character?.name || '' })}
                />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'name')}</div>

                <TextField
                    margin="normal"
                    fullWidth
                    label="Edad"
                    type="number"
                    focused
                    {...register('age', { required: 'La edad es requerida', value: character?.age.toString() })}
                />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'age')}</div>

                <TextField
                    margin="normal"
                    fullWidth
                    label="Peso"
                    type="number"
                    focused
                    {...register('weight', { required: 'El apellido es requerido', value: character?.weight.toString() })}
                />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'weight')}</div>

                <TextField margin="normal" fullWidth label="Historia" focused {...register('story', { value: character?.story })} />
                <div className="error-form">{displayErrorForm<TCreateCharacter>(errors, 'story')}</div>

                <Button fullWidth variant="contained" color="primary" onClick={handleSubmit((data) => onSubmit(data))}>
                    Actualizar
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

export default UpdateCharacter;
