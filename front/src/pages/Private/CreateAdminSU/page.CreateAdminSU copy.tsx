// libraries

// models
import { TCreateAdminSU } from './model.CreateAdminSU';

// custom hooks
import usePageCreateAdminSU from './hook.CreateAdminSU';

// helpers
import { displayErrorForm } from '../../../utils/helpers';

// components

// style components

const CreateAdminSU = () => {
    const { register, handleSubmit, onSubmit, errors } = usePageCreateAdminSU();

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg rounded-lg mt-5">
                                    <div className="card-header">
                                        <div className="text-center">
                                            <img src="/assets/images/logofm.png" />
                                            <h3 className="text-center font-weight-light my-4">Registrar super usuario</h3>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div>
                                                <input
                                                    {...register('nombreusuario', { required: 'El nombre del usuario es requerido' })}
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingUsername"
                                                    placeholder="Usuario"
                                                />
                                                <label htmlFor="floatingUsername">Usuario</label>
                                                <div className="error-form">{displayErrorForm<TCreateAdminSU>(errors, 'nombreusuario')}</div>
                                            </div>

                                            <div>
                                                <input
                                                    {...register('nombres', { required: 'El nombre del usuario es requerido' })}
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingFirstname"
                                                    placeholder="Usuario"
                                                />
                                                <label htmlFor="floatingFirstname">Nombres</label>
                                                <div className="error-form">{displayErrorForm<TCreateAdminSU>(errors, 'nombres')}</div>
                                            </div>

                                            <div>
                                                <input
                                                    {...register('apellidos', { required: 'El nombre del usuario es requerido' })}
                                                    type="text"
                                                    className="form-control"
                                                    id="floatingLastname"
                                                    placeholder="Usuario"
                                                />
                                                <label htmlFor="floatingLastname">Apellidos</label>
                                                <div className="error-form">{displayErrorForm<TCreateAdminSU>(errors, 'apellidos')}</div>
                                            </div>  
                                            <div>
                                                <input
                                                    {...register('clave')}
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingPassword"
                                                    placeholder="Contraseña"
                                                />
                                                <label htmlFor="floatingPassword">Contraseña</label>
                                                <div className="error-form">{displayErrorForm<TCreateAdminSU>(errors, 'clave')}</div>
                                            </div>
                                            <div>
                                                <input
                                                    {...register('confirm')}
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingConfirm"
                                                    placeholder="Contraseña"
                                                />
                                                <label htmlFor="floatingConfirm">Confirmar contraseña</label>
                                                <div className="error-form">
                                                    <div className="error-form">{displayErrorForm<TCreateAdminSU>(errors, 'confirm')}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <button onClick={handleSubmit((data) => onSubmit(data))}>Actualizar</button>
                                                    <a href="/">
                                                        Cancelar
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Desarrollador: Otniel David Morales 2023</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CreateAdminSU;
