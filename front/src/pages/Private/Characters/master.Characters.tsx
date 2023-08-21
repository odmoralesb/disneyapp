import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router';

export const MasterCharacters = () => {
    return (
        <>
            <Typography variant="h6" sx={{ width: '100%', backgroundColor: '#CCCCCC', p: '3px 10px 3px 10px', color: 'blue' }}>
                Personajes
            </Typography>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default MasterCharacters;
