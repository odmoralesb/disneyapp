import { useEffect, useState } from 'react';

import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// models
import { IResponsePersonajes, ICharacterModel, ICharactersModel } from '../../../models';

// adapters
import { setResponseAdapter } from '../../../adapters';
import * as AdapterCharacter from '../../../adapters/adapter.character';

import { useFetch } from '../../../hooks/fetch';

// services
import * as serviceCharacter from '../../../services/service.character';

export const Characters = () => {
    const { callEndpoint } = useFetch();
    const [data, setData] = useState<ICharactersModel>({ rows: [] });

    const onLoadCharacters = async () => {
        const loadCharacters = serviceCharacter.getCharacters();
        callEndpoint(loadCharacters)
            .then((resp) => {
                const data = setResponseAdapter<IResponsePersonajes>(resp.data);
                if (data.payload.records) setData(AdapterCharacter.setDataCharacters(data.payload));
            })
            .catch((e) => {
                console.error(e);
                return;
            });
    };

    useEffect(() => {
        onLoadCharacters();
    }, []);

    return (
        <>
            <Card sx={{ minWidth: 275, mt: '7px' }}>
                <CardActions sx={{ backgroundColor: '#C4D3DC' }}>
                    <IconButton color="primary" aria-label="add an alarm">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </CardActions>
                <CardContent>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Imagen</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Edad</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Peso</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Historia</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Películas</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.rows.map((row: ICharacterModel) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>Imagen</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.age}</TableCell>
                                        <TableCell>{row.weight}</TableCell>
                                        <TableCell>{row.story}</TableCell>
                                        <TableCell>Peliculas</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    );
};

export default Characters;
