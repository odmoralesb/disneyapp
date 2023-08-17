import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

import { Link } from 'react-router-dom';
import { PrivateRoutes } from '../../../models/model.routes';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <Link to={`/${PrivateRoutes.DASHBOARD}`} style={{ textDecoration: 'none' }}>
                <ListItemText primary="Dashboard" />
            </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <Link to={`/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.MOVIES}`} style={{ textDecoration: 'none' }}>
                <ListItemText primary="Peliculas" />
            </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <Link to={`/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.CHARACTERS}`} style={{ textDecoration: 'none' }}>
                <ListItemText primary="Personajes" />
            </Link>
        </ListItemButton>
    </React.Fragment>
);
