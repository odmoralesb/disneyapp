import React from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

// models
import { TLogin } from './model.Login';

// custom hooks
import usePageLogin from './hook.Login';

// helpers
import { displayErrorForm } from '../../utils/helpers';

// components

const Login: React.FC = () => {
    const { register, handleSubmit, onSubmit, errors } = usePageLogin();
    return (
        <Container component="main" maxWidth="xs">
            <div>
                <div style={{ textAlign: 'center' }}>
                    <img src="/assets/images/logofm.png" height={'200px'} />
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                </div>
                <form>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Nombre de usuario"
                        {...register('username', { required: 'El usuario es requerido' })}
                    />
                    <div className="error-form">{displayErrorForm<TLogin>(errors, 'username')}</div>
                    <TextField margin="normal" fullWidth label="Contraseña" type="password" {...register('password')} />
                    <div className="error-form">{displayErrorForm<TLogin>(errors, 'password')}</div>
                    <Button fullWidth variant="contained" color="primary" onClick={handleSubmit((data) => onSubmit(data))}>
                        Iniciar sesión
                    </Button>
                    <br />
                    <br />
                    <Button fullWidth variant="contained" color="secondary">
                        <a style={{ textDecoration: 'none', color: '#FFFFFF' }} href="/register">
                            Registrese
                        </a>
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;
