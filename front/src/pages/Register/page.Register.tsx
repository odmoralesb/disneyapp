// libraries
import React from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

// models
import { TRegister } from './model.Register';

// custom hooks
import useRegister from './hook.Register';

// helpers
import { displayErrorForm } from '../../utils/helpers';

// components

// style components

const Register: React.FC = () => {
    const { register, handleSubmit, onSubmit, errors } = useRegister();

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <div style={{ textAlign: 'center' }}>
                    <img src="/assets/images/logofm.png" height={'200px'} />
                    <Typography component="h1" variant="h5">
                        Registro
                    </Typography>
                </div>
                <form>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Alias de usuario"
                        {...register('username', { required: 'El usuario es requerido' })}
                    />
                    <div className="error-form">{displayErrorForm<TRegister>(errors, 'username')}</div>

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Nombre de usuario"
                        {...register('firstname', { required: 'El nombre es requerido' })}
                    />
                    <div className="error-form">{displayErrorForm<TRegister>(errors, 'firstname')}</div>

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Apellido de usuario"
                        {...register('lastname', { required: 'El apellido es requerido' })}
                    />
                    <div className="error-form">{displayErrorForm<TRegister>(errors, 'lastname')}</div>

                    <TextField margin="normal" fullWidth label="Contraseña" type="password" {...register('password')} />
                    <div className="error-form">{displayErrorForm<TRegister>(errors, 'password')}</div>

                    <TextField margin="normal" fullWidth label="Confirmar contraseña" type="password" {...register('confirm')} />
                    <div className="error-form">{displayErrorForm<TRegister>(errors, 'password')}</div>

                    <Button fullWidth variant="contained" color="primary" onClick={handleSubmit((data) => onSubmit(data))}>
                        Aceptar
                    </Button>
                    <br />
                    <br />
                    <Button fullWidth variant="contained" color="secondary">
                        <a style={{ textDecoration: 'none', color: '#FFFFFF' }} href="/">
                            Cancelar
                        </a>
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Register;
