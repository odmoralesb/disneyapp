// Libraries
import { useState } from 'react';
import { Outlet, Path } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Store
import { IAppStore } from '../../../redux/store';

// Models
import { PrivateRoutes } from '../../../models/model.routes';

// Components
import Logout from '../Logout';

// Style components

export const NavbarComponent = () => {
    const userState = useSelector((store: IAppStore) => store.usuario);

    return (
        <div>
            <nav>
                <Link to={'/' + PrivateRoutes.DASHBOARD} className="nav-link ms-3">
                    Panel
                </Link>
                <a href="#">Enlace 1</a>
                <a href="#">Enlace 2</a>
                <div className="small text-center">{`${userState.nombreusuario} - ${userState.rol}`}</div>
                <Logout />
            </nav>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
            <footer>
                <div className="text-muted">Copyright &copy; Desarrollador: Otniel David Morales 2023</div>
            </footer>
        </div>
    );
};

export default NavbarComponent;
