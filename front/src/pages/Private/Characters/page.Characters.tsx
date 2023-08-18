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

export const Characters = () => {
    const rows: any = [];

    return (
        <>
            <Typography variant="h6" sx={{ width: '100%', backgroundColor: '#CCCCCC', p: '3px 10px 3px 10px', color: 'blue' }}>
                Personajes
            </Typography>
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
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                        Nombre
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                        Edad
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                        Peso
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                        Historia
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                        Películas
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row: any) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>Imagen</TableCell>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.edad}</TableCell>
                                        <TableCell>{row.peso}</TableCell>
                                        <TableCell>{row.historia}</TableCell>
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
